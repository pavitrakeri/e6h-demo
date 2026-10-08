import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Brain,
  MessageCircle,
  Sparkles,
  Users,
  CheckCircle2,
  Heart,
  Smile,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/mind-connection")({
  head: () => ({
    meta: [
      { title: "My Mind & Connection — e6health" },
      { name: "description", content: "Cognitive vitality, neuro-plasticity, emotional wellness, and community connection." },
    ],
  }),
  component: MindConnectionPage,
});

const cognitiveScores = [
  { metric: "Cognitive Focus & Flow", score: 88, status: "Optimal", color: "#2FB7B1", note: "Peak morning mental clarity sustained on GLP-1 stable glucose" },
  { metric: "Stress / Cortisol Regulation", score: 82, status: "Low Burden", color: "#259E99", note: "4-7-8 breathing and low caffeine after 12 PM" },
  { metric: "Emotional Stability", score: 85, status: "High Resilience", color: "#C2A46D", note: "Consistent self-reported mood logs over past 30 days" },
  { metric: "Neuro-Plasticity Support", score: 80, status: "Active", color: "#DE3C30", note: "Omega-3 DHA and cold exposure stimulate BDNF synthesis" },
];

const communityDiscussions = [
  {
    topic: "Handling dining out in Dubai while on GLP-1 optimization",
    author: "Fatima A. (Dubai Marina)",
    replies: 14,
    time: "2 hours ago",
    tag: "Social Dining",
  },
  {
    topic: "Best timing for Berberine vs Semaglutide injection day?",
    author: "Rashid K. (Abu Dhabi)",
    replies: 28,
    time: "Yesterday",
    tag: "Protocol Tips",
  },
  {
    topic: "Cold exposure at 7 AM: who else noticed the HRV spike?",
    author: "Sarah Johnson (You)",
    replies: 9,
    time: "3 days ago",
    tag: "Recovery",
  },
];

function MindConnectionPage() {
  const [mindCheckin, setMindCheckin] = useState({ mood: 8, clarity: 9, stress: 3 });
  const [checkinSaved, setCheckinSaved] = useState(false);

  const handleSave = () => {
    setCheckinSaved(true);
    setTimeout(() => setCheckinSaved(false), 2200);
  };

  return (
    <DashboardLayout title="My Mind & Connection">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.12)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2FB7B1] mb-1">
              <span>🧠</span> Neuro-Cognition & Community
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Mind & Connection
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Cognitive performance, emotional resilience, AI coach connection, and longevity community.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/ai-assistant"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-4 sm:px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> Open AI Health Assistant
            </Link>
          </div>
        </div>

        {/* 4 Cognitive & Mental Vitality Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {cognitiveScores.map((item) => (
            <div
              key={item.metric}
              className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
                  <span className="font-semibold text-white truncate text-[11px] sm:text-xs">{item.metric}</span>
                  <Brain className="h-4 w-4 shrink-0" style={{ color: item.color }} />
                </div>
                <div className="mt-1 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-2xl sm:text-3xl font-bold" style={{ color: item.color }}>
                    {item.score}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#B8C5C6]">/ 100</span>
                </div>
                <span className="inline-block mt-1 text-[9px] sm:text-[10px] font-bold text-[#2FB7B1] bg-[#2FB7B1]/10 px-2 py-0.5 rounded-full">
                  {item.status}
                </span>
                <p className="text-[11px] sm:text-xs text-[#B8C5C6] mt-2 sm:mt-3 leading-relaxed">{item.note}</p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[rgba(47,183,177,0.1)]">
                <div className="w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Mind Calibration Check-In */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Daily Mind & Stress Calibration
              </h3>
              <p className="text-xs text-[#B8C5C6]">Quick self-assessment to synchronize cortisol and mental fatigue</p>
            </div>
            <Smile className="h-5 w-5 text-[#2FB7B1]" />
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="rounded-xl bg-[#0B1F2A]/40 p-4 border border-[rgba(47,183,177,0.1)]">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-white">Mood & Positivity</span>
                <span className="text-sm font-bold text-[#2FB7B1]">{mindCheckin.mood} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={mindCheckin.mood}
                onChange={(e) => setMindCheckin({ ...mindCheckin, mood: parseInt(e.target.value) })}
                className="w-full accent-[#2FB7B1]"
              />
            </div>

            <div className="rounded-xl bg-[#0B1F2A]/40 p-4 border border-[rgba(47,183,177,0.1)]">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-white">Mental Clarity</span>
                <span className="text-sm font-bold text-[#C2A46D]">{mindCheckin.clarity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={mindCheckin.clarity}
                onChange={(e) => setMindCheckin({ ...mindCheckin, clarity: parseInt(e.target.value) })}
                className="w-full accent-[#C2A46D]"
              />
            </div>

            <div className="rounded-xl bg-[#0B1F2A]/40 p-4 border border-[rgba(47,183,177,0.1)]">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-white">Stress Level</span>
                <span className="text-sm font-bold text-[#DE3C30]">{mindCheckin.stress} / 10 (Low)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={mindCheckin.stress}
                onChange={(e) => setMindCheckin({ ...mindCheckin, stress: parseInt(e.target.value) })}
                className="w-full accent-[#DE3C30]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-[#2FB7B1] px-6 py-2.5 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md"
            >
              {checkinSaved ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Mind Check-in Saved
                </>
              ) : (
                "Save Mind Calibration"
              )}
            </button>
          </div>
        </div>

        {/* AI Longevity Coach Spotlight */}
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-r from-[#1E4D57] to-[#132F3A] p-6 shadow-xl md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2FB7B1] text-[#0B1F2A] shadow-lg">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Talk to Your AI Longevity Coach
              </h3>
              <p className="text-xs text-[#B8C5C6] mt-1 max-w-xl">
                Have questions about food cravings, GLP-1 nausea mitigation, or optimizing sleep timing? Your AI assistant is synced with your live telemetry.
              </p>
            </div>
          </div>
          <Link
            to="/ai-assistant"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#0B1F2A] px-6 py-3 text-xs font-bold text-[#2FB7B1] border border-[rgba(47,183,177,0.3)] hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all shadow-md shrink-0"
          >
            Start Conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Community Connection & Longevity Cohort */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#2FB7B1]" />
              <div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  e6health UAE Longevity Circle
                </h3>
                <p className="text-xs text-[#B8C5C6]">Anonymized peer peer-learning & protocol discussions</p>
              </div>
            </div>
            <span className="text-xs text-[#2FB7B1] font-semibold">1,420 Active Patients</span>
          </div>

          <div className="divide-y divide-[rgba(47,183,177,0.1)]">
            {communityDiscussions.map((item) => (
              <div key={item.topic} className="py-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center hover:bg-[#1E4D57]/20 px-3 rounded-lg transition-colors">
                <div>
                  <span className="rounded-full bg-[#2FB7B1]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#2FB7B1]">
                    {item.tag}
                  </span>
                  <p className="text-sm font-semibold text-white mt-1.5">{item.topic}</p>
                  <p className="text-xs text-[#B8C5C6] mt-0.5">By {item.author} · {item.time}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2FB7B1] shrink-0">
                  <MessageCircle className="h-3.5 w-3.5" /> {item.replies} replies
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
