import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Moon,
  Heart,
  Zap,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Wind,
  Snowflake,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/recovery")({
  head: () => ({
    meta: [
      { title: "My Recovery — e6health" },
      { name: "description", content: "Sleep architecture, nocturnal HRV, and autonomic nervous system regeneration." },
    ],
  }),
  component: RecoveryPage,
});

const sleepArchitecture = [
  { stage: "Deep Sleep (Physical Repair)", duration: "2h 30m", percentage: 33, color: "#2FB7B1", note: "GH secretion & cellular tissue repair" },
  { stage: "REM Sleep (Cognitive Integration)", duration: "1h 30m", percentage: 20, color: "#259E99", note: "Neuro-plasticity and memory consolidation" },
  { stage: "Light Sleep", duration: "3h 00m", percentage: 40, color: "#C2A46D", note: "Baseline autonomic stabilization" },
  { stage: "Awake / Restlessness", duration: "0h 30m", percentage: 7, color: "#DE3C30", note: "Normal micro-arousals (1-2 times)" },
];

const recoveryTrends = [
  { day: "Mon", hrv: 48, rhr: 60, score: 72 },
  { day: "Tue", hrv: 50, rhr: 59, score: 75 },
  { day: "Wed", hrv: 45, rhr: 62, score: 68 },
  { day: "Thu", hrv: 52, rhr: 58, score: 78 },
  { day: "Fri", hrv: 55, rhr: 57, score: 82 },
  { day: "Sat", hrv: 58, rhr: 56, score: 85 },
  { day: "Sun", hrv: 52, rhr: 58, score: 78 },
];

const recoveryModalities = [
  {
    title: "Magnesium Glycinate Supplementation",
    time: "10:00 PM (30 min before bed)",
    desc: "300mg binds to GABA receptors, calming central nervous system excitation.",
    active: true,
  },
  {
    title: "Circadian Bedroom Cooling (66°F / 19°C)",
    time: "All Night",
    desc: "Facilitates 1°C core body temperature drop required for prolonged stage 3 deep sleep.",
    active: true,
  },
  {
    title: "4-7-8 Vagal Nerve Breathing",
    time: "10:15 PM (5 mins)",
    desc: "Rapidly shifts sympathovagal balance toward parasympathetic dominance.",
    active: true,
  },
  {
    title: "Morning Cold Exposure (Cold Shower)",
    time: "7:15 AM (2-3 mins)",
    desc: "Activates norepinephrine and resets autonomic tone for the day.",
    active: true,
  },
];

function RecoveryPage() {
  return (
    <DashboardLayout title="My Recovery">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.12)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2FB7B1] mb-1">
              <span>🌙</span> Restorative Sleep & Parasympathetic Tone
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Recovery
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Autonomic nervous system recovery, sleep stage architecture, and nightly HRV telemetry.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/wearables"
              className="rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 py-2 text-xs font-bold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all"
            >
              Oura Ring Connected
            </Link>
          </div>
        </div>

        {/* Top Readiness & Recovery Showcase */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-br from-[#1E4D57] to-[#132F3A] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                <span className="font-semibold text-white">Daily Readiness Score</span>
                <Moon className="h-4 w-4 text-[#C2A46D]" />
              </div>
              <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  78
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#2FB7B1]">/ 100</span>
              </div>
              <p className="text-xs font-bold text-[#2FB7B1] mt-1.5 sm:mt-2">Optimal Recovery Profile</p>
              <p className="text-xs text-[#B8C5C6] mt-1 leading-relaxed">
                Autonomic balance is restored. Cardiovascular system is fully prepared for today's resistance workout.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(47,183,177,0.15)] flex justify-between text-[10px] sm:text-[11px] text-[#B8C5C6]">
              <span>Sleep Efficiency: 92%</span>
              <span>Latency: 14 mins</span>
            </div>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                <span className="font-semibold text-white">Nocturnal HRV (Night Avg)</span>
                <Zap className="h-4 w-4 text-[#2FB7B1]" />
              </div>
              <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-[#2FB7B1]">52</span>
                <span className="text-xs text-[#B8C5C6]">ms</span>
              </div>
              <p className="text-xs font-semibold text-white mt-1.5 sm:mt-2">Baseline Range: 46–56 ms</p>
              <p className="text-xs text-[#B8C5C6] mt-1 leading-relaxed">
                Elevated RMSSD indicates robust vagal nerve tone and absence of physiological overtraining.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(47,183,177,0.1)] text-[10px] sm:text-[11px] text-[#2FB7B1]">
              ✓ +4 ms vs. monthly rolling average
            </div>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                <span className="font-semibold text-white">Lowest Resting Heart Rate</span>
                <Heart className="h-4 w-4 text-[#DE3C30]" />
              </div>
              <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-white">58</span>
                <span className="text-xs text-[#B8C5C6]">bpm</span>
              </div>
              <p className="text-xs font-semibold text-[#2FB7B1] mt-1.5 sm:mt-2">Reached at 3:45 AM (Deep Stage)</p>
              <p className="text-xs text-[#B8C5C6] mt-1 leading-relaxed">
                Early nocturnal RHR dip confirms complete dinner digestive clearance before bedtime.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(47,183,177,0.1)] text-[10px] sm:text-[11px] text-[#B8C5C6]">
              Normal Athletic Range: 50–62 bpm
            </div>
          </div>
        </div>

        {/* Sleep Architecture Breakdown */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
          <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sleep Stage Architecture
              </h3>
              <p className="text-xs text-[#B8C5C6]">Total Time Asleep: 7h 30m · In bed: 8h 10m</p>
            </div>
            <span className="text-xs font-semibold text-[#2FB7B1]">Deep Sleep: 33% (Optimal: 20-25%)</span>
          </div>

          {/* Visual Stacked Stage Bar */}
          <div className="my-4 sm:my-6 flex h-3.5 sm:h-4 w-full overflow-hidden rounded-full bg-[#1E4D57]">
            {sleepArchitecture.map((stage) => (
              <div
                key={stage.stage}
                style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                title={`${stage.stage}: ${stage.duration}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {sleepArchitecture.map((stage) => (
              <div
                key={stage.stage}
                className="rounded-xl bg-[#0B1F2A]/40 p-3 sm:p-4 border border-[rgba(47,183,177,0.1)] space-y-1"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                  <span className="text-[11px] sm:text-xs font-semibold text-white truncate">{stage.stage}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-lg sm:text-xl font-bold text-white">{stage.duration}</span>
                  <span className="text-xs font-bold" style={{ color: stage.color }}>
                    {stage.percentage}%
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#B8C5C6] leading-tight pt-1">{stage.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day HRV & Recovery Trend */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                7-Day Recovery & HRV Progression
              </h3>
              <p className="text-xs text-[#B8C5C6]">Consistent nocturnal baseline recovery across past week</p>
            </div>
            <span className="text-xs font-semibold text-[#2FB7B1]">Average Score: 77</span>
          </div>
          <div className="h-56 sm:h-72 w-full min-w-0 overflow-hidden pt-2 sm:pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hrvFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2FB7B1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2FB7B1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(47,183,177,0.1)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#B8C5C6" fontSize={11} tickLine={false} />
                <YAxis domain={[30, 90]} stroke="#B8C5C6" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E4D57",
                    border: "1px solid rgba(47,183,177,0.2)",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                  labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#2FB7B1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#hrvFill)"
                  name="Recovery Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prescribed Recovery Modalities */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <h3 className="mb-4 text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Prescribed Recovery Modalities
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {recoveryModalities.map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-[#1E4D57]/30 p-4 border border-[rgba(47,183,177,0.1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">{item.title}</span>
                    <span className="text-[#2FB7B1] font-semibold">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#B8C5C6] leading-relaxed mt-1">{item.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[rgba(47,183,177,0.1)] flex items-center gap-1.5 text-[10px] text-[#2FB7B1] font-semibold">
                  <CheckCircle2 className="h-3 w-3" /> Active Protocol
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
