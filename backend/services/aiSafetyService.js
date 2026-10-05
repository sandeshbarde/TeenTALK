const https = require('https');
const { CRISIS_HOTLINES } = require('../config/constants');
const { logAuditEvent } = require('../middleware/audit');

// Patterns indicating immediate crisis, self-harm, or severe abuse
const CRISIS_PATTERNS = [
  /suicid/i,
  /kill\s+myself/i,
  /hurt\s+myself/i,
  /end\s+my\s+life/i,
  /want\s+to\s+die/i,
  /cutting\s+myself/i,
  /overdose/i,
  /beating\s+me/i,
  /abuse\s+at\s+home/i,
  /sexual\s+assault/i,
  /molest/i,
];

// Patterns for unsafe or illegal instructions
const UNSAFE_INSTRUCTION_PATTERNS = [
  /how\s+to\s+hack/i,
  /make\s+a\s+bomb/i,
  /buy\s+drugs/i,
  /steal\s+passwords/i,
  /bypass\s+parental\s+control/i,
  /doxx/i,
];

// Patterns inquiring about medical/legal prescriptions
const MEDICAL_LEGAL_PATTERNS = [
  /diagnose\s+me/i,
  /prescribe\s+medicine/i,
  /what\s+pills\s+to\s+take/i,
  /legal\s+contract/i,
  /lawsuit\s+advice/i,
];

/**
  * Helper to query Google Gemini REST API if GEMINI_API_KEY is available in environment
  */
const callGeminiAPI = async (promptText) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  return new Promise((resolve) => {
    const payload = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are TeenTalk AI, an empathetic, supportive, and safety-focused AI assistant for teenagers and parents in India. Uphold child protection guidelines (POSH & POCSO Act). Provide concise, reassuring, actionable advice. Never give medical diagnoses, dangerous instructions, or violate privacy.\n\nUser Question: ${promptText}`
            }
          ]
        }
      ]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 6000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const reply = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          resolve(reply || null);
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.write(payload);
    req.end();
  });
};

const processAIChatMessage = async (userOrNull, message) => {
  if (!message || !message.trim()) {
    const error = new Error('Chat message content is required');
    error.statusCode = 400;
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  const trimmedMessage = message.trim();

  // 1. CRISIS / IMMEDIATE DANGER DETECTION (STRICT SAFETY GUARDRAIL)
  for (const pattern of CRISIS_PATTERNS) {
    if (pattern.test(trimmedMessage)) {
      await logAuditEvent({
        actorId: userOrNull ? userOrNull.id : null,
        action: 'AI_CRISIS_ESCALATION_TRIGGERED',
        resourceType: 'ai_safety',
        details: { category: 'crisis_intervention' },
      });

      return {
        reply: `I care deeply about your life and safety. Please reach out immediately to a trusted adult, family member, school counselor, or call the 24/7 free toll-free emergency helpline below right now. You are not alone.`,
        is_crisis: true,
        is_refusal: false,
        escalation: {
          requires_immediate_attention: true,
          hotlines: CRISIS_HOTLINES,
          guidance: 'Please speak with a trusted adult, school counselor, or call the toll-free emergency helpline right now.',
        },
        disclaimer: 'TeenTalk AI is an educational peer safety assistant and cannot provide medical or emergency rescue services.',
      };
    }
  }

  // 2. UNSAFE / HARMFUL INSTRUCTIONS DETECTION
  for (const pattern of UNSAFE_INSTRUCTION_PATTERNS) {
    if (pattern.test(trimmedMessage)) {
      return {
        reply: "I cannot provide instructions or techniques that lead to digital security breaches, physical harm, or illegal activities. If you have questions about staying safe online, I'd be glad to share safety best practices.",
        is_crisis: false,
        is_refusal: true,
        escalation: null,
        disclaimer: 'TeenTalk AI is programmed to uphold student safety and ethical standards.',
      };
    }
  }

  // 3. MEDICAL / LEGAL DISCLAIMER
  for (const pattern of MEDICAL_LEGAL_PATTERNS) {
    if (pattern.test(trimmedMessage)) {
      return {
        reply: "I cannot provide formal medical diagnoses, medication advice, or legal counsel. For medical concerns, please consult a qualified physician or school health officer. For legal guidance, please speak with an authorized legal professional.",
        is_crisis: false,
        is_refusal: true,
        escalation: null,
        disclaimer: 'TeenTalk AI is not a licensed physician or attorney.',
      };
    }
  }

  // 4. ATTEMPT REAL GEMINI AI CONNECTION
  const geminiReply = await callGeminiAPI(trimmedMessage);
  if (geminiReply) {
    return {
      reply: geminiReply,
      is_crisis: false,
      is_refusal: false,
      escalation: null,
      disclaimer: 'Powered by Gemini AI (TeenTalk Safety Guardrails Active)',
    };
  }

  // 5. EDUCATIONAL GUIDANCE RESPONSES (Rule-based Fallback)
  let responseText = '';
  const lowerMsg = trimmedMessage.toLowerCase();

  if (lowerMsg.includes('bully') || lowerMsg.includes('teas')) {
    responseText = `Facing bullying or teasing can feel very isolating, but remember that it is NEVER your fault.\n\nHere are 3 steps you can take:\n1. **Do not retaliate**: Bullies often seek an emotional reaction.\n2. **Save Evidence**: Keep screenshots or notes of dates and times.\n3. **Reach Out**: Confide in a teacher, parent, or use TeenTalk's confidential complaint tool.`;
  } else if (lowerMsg.includes('stress') || lowerMsg.includes('anxi') || lowerMsg.includes('exam')) {
    responseText = `Exam and academic pressure is very common. Try this grounding technique right now:\n\n**Box Breathing (4-4-4):**\n• Inhale slowly for 4 seconds\n• Hold gently for 4 seconds\n• Exhale smoothly for 4 seconds\n• Rest for 4 seconds, then repeat 3 times.\n\nBreak your studying into 25-minute focused blocks and take short walks. Would you like to log your mood in the Mood Tracker?`;
  } else if (lowerMsg.includes('password') || lowerMsg.includes('hacked') || lowerMsg.includes('privacy')) {
    responseText = `Protecting your digital privacy is super important! Here is what you should do immediately:\n\n1. **Change your passwords**: Use 12+ characters combining letters, numbers, and symbols.\n2. **Enable Two-Factor Authentication (2FA)** on all social and gaming apps.\n3. **Never share OTPs** or login codes with friends online.`;
  } else {
    responseText = `Hello! I am your TeenTalk Safety Companion. I am here to support you with online privacy, safe boundaries, managing school stress, and relationship safety.\n\nHow can I help you today?`;
  }

  return {
    reply: responseText,
    is_crisis: false,
    is_refusal: false,
    escalation: null,
    disclaimer: 'TeenTalk AI provides educational peer safety information and does not substitute for licensed counseling.',
  };
};

module.exports = {
  processAIChatMessage,
  callGeminiAPI,
};
