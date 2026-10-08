import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  FileText,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Longevity Assessment — e6health" },
      { name: "description", content: "Comprehensive multi-dimensional health and longevity assessment." },
    ],
  }),
  component: AssessmentPage,
});

interface AssessmentCategory {
  category: string;
  score: number;
  trend: string;
  color: string;
}

interface QuestionAnswer {
  q: string;
  answer: string;
  score: number;
}

interface AssessmentDetail {
  category: string;
  questions: QuestionAnswer[];
}

const assessmentStatus = {
  status: "Completed",
  date: "April 15, 2026",
  nextDue: "July 15, 2026",
  daysUntilNext: 91,
};

const categoryScores: AssessmentCategory[] = [
  { category: "Energy & Vitality", score: 82, trend: "+5", color: "#2FB7B1" },
  { category: "Sleep Quality", score: 78, trend: "+8", color: "#C2A46D" },
  { category: "Digestion & Gut Health", score: 75, trend: "+3", color: "#259E99" },
  { category: "Mood & Mental Clarity", score: 85, trend: "+7", color: "#2FB7B1" },
  { category: "Body Composition", score: 72, trend: "+6", color: "#C77066" },
  { category: "GLP-1 Tolerability", score: 88, trend: "+12", color: "#2FB7B1" },
];

const assessmentDetails: AssessmentDetail[] = [
  {
    category: "Energy & Vitality",
    questions: [
      { q: "How would you rate your overall daily energy levels?", answer: "Very Good (8/10)", score: 82 },
      { q: "Do you experience afternoon energy crashes?", answer: "Rarely (1x weekly)", score: 85 },
      { q: "How is your motivation for exercise and movement?", answer: "Consistent & High", score: 80 },
    ],
  },
  {
    category: "Sleep Quality",
    questions: [
      { q: "Average continuous sleep duration?", answer: "7–8 hours", score: 80 },
      { q: "Subjective restorative feeling upon waking?", answer: "Good / Refreshed", score: 75 },
      { q: "Number of nightly wakeups?", answer: "0–1 time", score: 78 },
    ],
  },
  {
    category: "Digestion & Gut Health",
    questions: [
      { q: "Post-meal bloating or abdominal distension?", answer: "Minimal", score: 75 },
      { q: "Satiety feedback regulation on GLP-1?", answer: "Moderate & controlled", score: 72 },
      { q: "Nausea or delayed gastric distress?", answer: "Mild, well-managed with hydration", score: 78 },
    ],
  },
  {
    category: "Mood & Mental Clarity",
    questions: [
      { q: "Emotional stability and stress tolerance?", answer: "Positive & Stable", score: 85 },
      { q: "Cognitive sharpness and task focus?", answer: "Sharp & alert", score: 88 },
      { q: "Perceived daily anxiety index?", answer: "Low to moderate", score: 82 },
    ],
  },
  {
    category: "Body Composition & Physical Performance",
    questions: [
      { q: "Visceral fat reduction trend?", answer: "Steadily decreasing", score: 75 },
      { q: "Lean skeletal muscle preservation during deficit?", answer: "Stable based on resistance training", score: 70 },
      { q: "Post-workout recovery duration?", answer: "Under 24 hours", score: 72 },
    ],
  },
  {
    category: "GLP-1 Tolerability",
    questions: [
      { q: "Medication adherence consistency?", answer: "100% on schedule", score: 95 },
      { q: "Management of common side effects?", answer: "Optimized through bio-aligned meals", score: 85 },
      { q: "Satisfaction with metabolic progression?", answer: "Very Satisfied", score: 85 },
    ],
  },
];

const pastAssessments = [
  { date: "April 15, 2026", score: 82, badge: "Current Baseline", change: "+8 points" },
  { date: "January 15, 2026", score: 74, badge: "90-Day Review", change: "+6 points" },
  { date: "October 15, 2025", score: 68, badge: "Initial Onboarding", change: "Baseline" },
];

function AssessmentPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Energy & Vitality");
  const [retakeModal, setRetakeModal] = useState(false);
  const [retakeSuccess, setRetakeSuccess] = useState(false);

  const toggleCategory = (cat: string) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  };

  const handleRetakeSubmit = () => {
    setRetakeSuccess(true);
    setTimeout(() => {
      setRetakeSuccess(false);
      setRetakeModal(false);
    }, 1800);
  };

  const overallScore = Math.round(
    categoryScores.reduce((acc, curr) => acc + curr.score, 0) / categoryScores.length
  );

  return (
    <DashboardLayout title="Assessment">
      <div className="mx-auto max-w-[1500px] space-y-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.1)] pb-6 md:flex-row md:items-center">
          <div>
            <h2
              className="text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Longevity & Wellness Assessment
            </h2>
            <p className="mt-1 text-sm text-[#B8C5C6]">
              Comprehensive physiological and qualitative check performed quarterly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/questionnaire"
              className="flex items-center gap-2 rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#132F3A] px-4 py-2.5 text-xs font-bold text-[#2FB7B1] shadow-md hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all"
            >
              <FileText className="h-4 w-4" /> Full Questionnaire (Single Page)
            </Link>
            <button
              onClick={() => setRetakeModal(true)}
              className="flex items-center gap-2 rounded-lg bg-[#2FB7B1] px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all"
            >
              <RotateCcw className="h-4 w-4" /> Quick Retake
            </button>
          </div>
        </div>

        {/* Current Assessment Status Card */}
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-r from-[#1E4D57] to-[#132F3A] p-6 shadow-xl lg:flex-row lg:items-center">
          <div className="flex items-center gap-6">
            <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[conic-gradient(#2FB7B1_82%,#0B1F2A_0)] shadow-inner">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-[#132F3A]">
                <span className="text-2xl font-bold text-[#2FB7B1]">{overallScore}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#2FB7B1] px-3 py-0.5 text-xs font-bold text-[#0B1F2A]">
                  {assessmentStatus.status}
                </span>
                <span className="text-xs text-[#B8C5C6]">Evaluated on {assessmentStatus.date}</span>
              </div>
              <h3
                className="mt-1 text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Comprehensive Score: {overallScore}/100
              </h3>
              <p className="text-xs text-[#B8C5C6] mt-0.5">
                Reflects optimal cellular vitality, high GLP-1 tolerability, and regenerative sleep balance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-[#0B1F2A]/50 p-4 border border-[rgba(47,183,177,0.15)] text-xs text-[#B8C5C6]">
            <Calendar className="h-5 w-5 text-[#C2A46D]" />
            <div>
              <p className="font-semibold text-white">Next Scheduled Review</p>
              <p>{assessmentStatus.nextDue} ({assessmentStatus.daysUntilNext} days remaining)</p>
            </div>
          </div>
        </div>

        {/* 6 Category Score Cards */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dimension Breakdown
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryScores.map((cat) => (
              <div
                key={cat.category}
                className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-5 shadow-xl transition-all hover:border-[#2FB7B1]/40"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                    <span className="font-semibold text-white">{cat.category}</span>
                    <span className="flex items-center gap-0.5 font-bold text-[#2FB7B1]">
                      <TrendingUp className="h-3.5 w-3.5" /> {cat.trend}
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: cat.color }}>
                      {cat.score}
                    </span>
                    <span className="text-xs text-[#B8C5C6]">/ 100</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(47,183,177,0.1)]">
                  <div className="w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${cat.score}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Questions & Responses Accordion */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <h3 className="mb-4 text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recorded Evaluation Details
          </h3>
          <div className="space-y-3">
            {assessmentDetails.map((group) => {
              const isOpen = expandedCategory === group.category;
              return (
                <div
                  key={group.category}
                  className="rounded-xl border border-[rgba(47,183,177,0.1)] bg-[#1E4D57]/30 overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(group.category)}
                    className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-[#1E4D57]/50"
                  >
                    <span className="text-sm font-bold text-white">{group.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#2FB7B1]">
                        {group.questions.length} Questions Evaluated
                      </span>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-[#B8C5C6]" /> : <ChevronDown className="h-4 w-4 text-[#B8C5C6]" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 divide-y divide-[rgba(47,183,177,0.1)] text-xs">
                      {group.questions.map((q, i) => (
                        <div key={i} className="py-3 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <p className="text-[#B8C5C6] max-w-lg">{q.q}</p>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-white">{q.answer}</span>
                            <span className="rounded-full bg-[#2FB7B1]/10 px-2 py-0.5 font-bold text-[#2FB7B1]">
                              {q.score} pts
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment History */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <h3 className="mb-4 text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Quarterly Progress Progression
          </h3>
          <div className="divide-y divide-[rgba(47,183,177,0.1)]">
            {pastAssessments.map((item) => (
              <div key={item.date} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E4D57] text-[#2FB7B1]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.date}</p>
                    <p className="text-xs text-[#B8C5C6]">{item.badge}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-[#2FB7B1]">{item.change}</span>
                  <div className="rounded-lg bg-[#0B1F2A] px-3 py-1.5 text-xs font-bold text-white border border-[rgba(47,183,177,0.2)]">
                    {item.score}/100
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retake Assessment Modal */}
      {retakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[rgba(47,183,177,0.3)] bg-[#132F3A] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Retake Wellness Assessment
            </h3>
            <p className="text-xs text-[#B8C5C6] mb-4">
              Answer 3 quick calibration questions to recalculate your real-time score.
            </p>
            {retakeSuccess ? (
              <div className="py-8 text-center text-[#2FB7B1]">
                <CheckCircle2 className="mx-auto h-12 w-12 mb-2" />
                <p className="text-base font-bold">Assessment Submitted!</p>
                <p className="text-xs text-[#B8C5C6] mt-1">Your longevity index updated to 83/100 (+1 pt).</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">
                    1. Current daily energy level (1-10)?
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    defaultValue="8"
                    className="w-full accent-[#2FB7B1]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">
                    2. Any GI or nausea symptoms on GLP-1?
                  </label>
                  <select className="w-full rounded-lg bg-[#1E4D57] p-2.5 text-xs text-white border border-[rgba(47,183,177,0.2)]">
                    <option>None (Fully adapted)</option>
                    <option>Mild nausea on injection day</option>
                    <option>Moderate</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">
                    3. Sleep quality and rested state?
                  </label>
                  <select className="w-full rounded-lg bg-[#1E4D57] p-2.5 text-xs text-white border border-[rgba(47,183,177,0.2)]">
                    <option>Deep & Restorative (7-8 hours)</option>
                    <option>Average (6-7 hours)</option>
                    <option>Restless</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-3">
                  <button
                    onClick={() => setRetakeModal(false)}
                    className="rounded-lg border border-[rgba(47,183,177,0.3)] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRetakeSubmit}
                    className="rounded-lg bg-[#2FB7B1] px-5 py-2 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white"
                  >
                    Calculate New Score
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
