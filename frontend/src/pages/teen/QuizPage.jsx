import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

export const QuizPage = () => {
  const { id } = useParams();
  const quizId = id || 'c0000003-0000-0000-0000-000000000003';
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generatingCert, setGeneratingCert] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await apiClient.get(`/quiz/${quizId}`);
        if (res.success) {
          setQuiz(res.data);
        }
      } catch (err) {
        showToast('Failed to load assessment questions', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, showToast]);

  const handleSelectOption = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!quiz) return;

    const answeredCount = Object.keys(answers).length;
    if (answeredCount < quiz.questions.length) {
      showToast(`Please answer all ${quiz.questions.length} questions before submitting (currently answered ${answeredCount}).`, 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiClient.post('/quiz/evaluate', {
        quiz_id: quiz.id,
        answers,
      });

      if (res.success && res.data) {
        setResult(res.data);
        if (res.data.passed) {
          showToast(`Congratulations! You passed with ${res.data.percentage || res.data.score}%!`, 'success');
        } else {
          showToast(`Score: ${res.data.percentage || res.data.score}%. Passing mark is 70%. Review and try again!`, 'warning');
        }
      }
    } catch (err) {
      showToast(err.message || 'Evaluation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerateCertificate = async () => {
    setGeneratingCert(true);
    try {
      const res = await apiClient.post('/certificate/teen-program');
      if (res.success && res.data) {
        showToast('Certificate generated successfully!', 'success');
        navigate(`/dashboard/teen/certificates/${res.data.id || res.data.certificate_code}`);
      }
    } catch (err) {
      showToast(err.message || 'Failed to generate certificate', 'error');
    } finally {
      setGeneratingCert(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading Teen Learning Assessment..." />;
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-bold text-slate-800">Assessment not available</h2>
        <Link to="/dashboard/teen/modules" className="text-teal-600 underline text-sm mt-2 inline-block">
          Return to modules
        </Link>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Quiz Title Banner */}
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-teal-900 to-teal-800 text-white border-teal-700 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <Badge variant="primary" className="bg-teal-700/60 text-teal-100 border-teal-600">
            Assessment
          </Badge>
          <span className="text-xs text-teal-200">
            Passing Criteria: 70% or higher • 10 Questions
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Teen Learning Assessment</h1>
        <p className="text-xs sm:text-sm text-teal-100 mt-1 leading-relaxed">
          Demonstrate your understanding of self-awareness, consent, puberty, menstrual hygiene, and decision-making.
        </p>
      </Card>

      {/* QUIZ RESULT SECTION */}
      {result ? (
        <Card
          className={`p-6 sm:p-10 border-2 ${
            result.passed ? 'border-emerald-400 bg-emerald-50/40' : 'border-amber-300 bg-amber-50/40'
          }`}
        >
          <div className="text-center space-y-4 mb-8">
            <div
              className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-white shadow-md ${
                result.passed ? 'bg-emerald-600' : 'bg-amber-500'
              }`}
            >
              {result.passed ? <Award className="w-9 h-9" /> : <RotateCcw className="w-8 h-8" />}
            </div>

            <h2 className="text-2xl font-black text-slate-900">Quiz Completed</h2>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
                <p className="text-lg font-black text-slate-800">
                  {result.correct_count ?? result.correct_answers} / {result.total_questions}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Percentage</span>
                <p className="text-lg font-black text-teal-700">
                  {result.percentage ?? result.score}%
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Correct</span>
                <p className="text-lg font-black text-emerald-600">
                  {result.correct_count ?? result.correct_answers}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-rose-500 uppercase">Wrong</span>
                <p className="text-lg font-black text-rose-600">
                  {result.wrong_answers ?? (result.total_questions - (result.correct_count ?? result.correct_answers))}
                </p>
              </div>
            </div>

            {/* Pass/Fail Status Banner */}
            <div className="pt-4">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  result.passed
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                Status: {result.status || (result.passed ? 'Passed' : 'Failed')}
              </span>
            </div>

            {/* Passing / Failing Message */}
            <div className="max-w-md mx-auto pt-2">
              {result.passed ? (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-emerald-800">
                    ✅ Congratulations! You have successfully completed the Teen Learning Program.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Award}
                    onClick={handleGenerateCertificate}
                    isLoading={generatingCert}
                    className="w-full shadow-lg bg-teal-600 hover:bg-teal-700 text-white font-bold"
                  >
                    Generate Certificate
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-amber-800">
                    You need at least 70% to receive the certificate.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    icon={RotateCcw}
                    onClick={() => {
                      setResult(null);
                      setAnswers({});
                      setCurrentQuestionIndex(0);
                    }}
                    className="w-full font-bold"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Breakdown Review */}
          {result.breakdown && result.breakdown.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Answer Review</h4>
              {result.breakdown.map((item, idx) => (
                <div
                  key={item.question_id || idx}
                  className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900">Question {idx + 1}</span>
                    {item.is_correct ? (
                      <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1 font-semibold">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-slate-800 font-medium">{item.question_text}</p>
                  {item.explanation && (
                    <p className="text-slate-500 text-[11px] pt-1">
                      <strong>Explanation:</strong> {item.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      ) : (
        /* ACTIVE QUESTION PAGER */
        <Card className="p-6 sm:p-8 border-slate-200 shadow-sm space-y-6">
          {/* Progress Indicator */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span className="text-teal-700">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span>{progressPercent}% Complete ({answeredCount} answered)</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Display */}
          <div className="pt-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question_text}
            </h3>
          </div>

          {/* Options (Radio Style) */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/80 text-teal-950 ring-2 ring-teal-600 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-teal-600 bg-teal-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls: Previous, Next, Submit */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={ChevronLeft}
              disabled={currentQuestionIndex === 0}
              onClick={handlePrevious}
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {!isLastQuestion ? (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  icon={ChevronRight}
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  icon={CheckCircle2}
                  onClick={handleSubmit}
                  isLoading={submitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
