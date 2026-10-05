import React, { useState } from 'react';
import {
  Mail,
  Building,
  Phone,
  MessageSquare,
  ShieldCheck,
  Send,
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { InputField } from '../../components/forms/InputField';
import { useToast } from '../../context/ToastContext';

export const ContactPage = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orgType: 'school',
    orgName: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your institutional inquiry has been received.', 'success');
    }, 700);
  };

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Emergency Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Need Immediate Help?</span> This contact form is for institutional partnerships and general administrative queries. If you or someone you know is in distress or danger, please dial <strong>1098 (Childline)</strong> or <strong>112 (National Emergency)</strong> right now.
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="primary">Institutional & Community Partnerships</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Partner with TeenTalk
        </h1>
        <p className="text-base text-slate-600">
          We work with K-12 schools, universities, NGOs, and workplace POSH committees to implement safe, verified educational programs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6 border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Reach Our Team</h3>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-lavender-100 text-lavender-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Institutional Partnerships</h4>
                  <p className="text-xs text-slate-500">partnerships@teentalk.org</p>
                  <p className="text-xs text-slate-500">support@teentalk.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint-100 text-mint-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Support Desk</h4>
                  <p className="text-xs text-slate-500">+91 (020) 2740-SAFE</p>
                  <p className="text-xs text-slate-500">Mon - Fri: 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-trust-100 text-trust-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Response Guarantee</h4>
                  <p className="text-xs text-slate-500">All institutional onboarding inquiries are answered within 24 business hours.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-mint-600" /> Academic Project Accreditation
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                TeenTalk is engineered as an open, research-grade initiative adhering to national POSH/POCSO frameworks and ISO/IEC data safety guidelines.
              </p>
            </div>
          </Card>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8 border-slate-200 shadow-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-mint-100 text-mint-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Inquiry Submitted Successfully</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{formData.name}</span>. Our partnership coordinator will reach out to <span className="font-semibold">{formData.email}</span> within 1 business day.
                </p>
                <div className="pt-4">
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Send an Institutional Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Dr. Sunita Sharma"
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="s.sharma@school.edu"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Organization Category
                    </label>
                    <select
                      name="orgType"
                      value={formData.orgType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-500"
                    >
                      <option value="school">K-12 School</option>
                      <option value="college">University / College</option>
                      <option value="ngo">NGO / Social Organization</option>
                      <option value="corporate">Corporate / Workplace POSH</option>
                      <option value="individual">Educator / Counselor</option>
                    </select>
                  </div>

                  <InputField
                    label="Organization Name"
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Delhi Public School"
                  />
                </div>

                <InputField
                  label="Contact Phone Number (Optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    How can we support your institution?
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about student count, safety curriculum goals, or POSH compliance requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-500"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" disabled={submitting} className="w-full justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    {submitting ? 'Sending...' : 'Submit Institutional Request'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
