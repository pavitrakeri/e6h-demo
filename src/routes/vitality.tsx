import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Zap,
  Sparkles,
  Dna,
  TrendingUp,
  BatteryCharging,
  Clock,
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/vitality")({
  head: () => ({
    meta: [
      { title: "My Vitality — e6health" },
      { name: "description", content: "Cellular energy, mitochondrial efficiency, and biological age optimization." },
    ],
  }),
  component: VitalityPage,
});

const energyCheckpoints = [
  { time: "Morning (7:30 AM)", level: 8.5, note: "Woke refreshed, early morning cortisol spike is healthy", status: "high" },
  { time: "Midday (1:00 PM)", level: 8.0, note: "Stable post-meal alertness on high-protein lunch", status: "high" },
  { time: "Afternoon (4:00 PM)", level: 7.8, note: "No 3 PM sugar crash due to GLP-1 and Berberine regulation", status: "stable" },
  { time: "Evening (8:30 PM)", level: 7.2, note: "Natural gradual wind-down preparing for melatonin surge", status: "optimal" },
];

const cellularPillars = [
  {
    name: "Mitochondrial Function & ATP",
    score: 86,
    sub: "Optimal respiratory capacity",
    note: "Zone 2 cardio and cold showers support mitochondrial biogenesis.",
    color: "#2FB7B1",
  },
  {
    name: "AMPK Pathway Activation",
    score: 90,
    sub: "High metabolic flexibility",
    note: "Berberine 500mg + 16:8 fasting activate cellular energy clearance.",
    color: "#259E99",
  },
  {
    name: "Insulin Sensitivity",
    score: 84,
    sub: "Fasting glucose 92 mg/dL",
    note: "Continuous improvement across past 3 comprehensive lab panels.",
    color: "#C2A46D",
  },
  {
    name: "Cellular Autophagy Index",
    score: 79,
    sub: "Nightly cellular recycling",
    note: "Autophagic clearance peaked during 15-hour fasting window.",
    color: "#DE3C30",
  },
];

function VitalityPage() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  return (
    <DashboardLayout title="My Vitality">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.12)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2FB7B1] mb-1">
              <span>⚡</span> Cellular Energy & Epigenetics
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Vitality
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Real-time cellular energy synthesis, mitochondrial capacity, and biological age calibration.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/lab-tests"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-4 sm:px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all w-full sm:w-auto"
            >
              <FlaskConical className="h-4 w-4" /> Order Epigenetic DNA Panel
            </Link>
          </div>
        </div>

        {/* Biological Age vs Chronological Age Showcase Banner */}
        <div className="rounded-2xl border border-[rgba(47,183,177,0.25)] bg-gradient-to-r from-[#1E4D57] via-[#132F3A] to-[#0B1F2A] p-5 sm:p-8 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-3 items-center">
            <div className="space-y-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2FB7B1]">
                <Dna className="h-4 w-4" /> Epigenetic Biological Age
              </span>
              <div className="flex items-baseline gap-2.5 sm:gap-3">
                <span className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  36.2
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#2FB7B1] bg-[#2FB7B1]/15 px-2.5 sm:px-3 py-1 rounded-full border border-[#2FB7B1]/30">
                  -5.8 Years Younger
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#B8C5C6]">
                Chronological Age: 42 Years · Rate of Aging: 0.86 yr/yr
              </p>
            </div>

            <div className="space-y-2 border-y lg:border-y-0 lg:border-x border-[rgba(47,183,177,0.15)] py-4 lg:py-0 lg:px-8">
              <span className="text-xs font-semibold text-[#B8C5C6]">Cellular Vitality Index</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-[#C2A46D]">84</span>
                <span className="text-xs text-[#B8C5C6]">/ 100 (Optimal)</span>
              </div>
              <p className="text-xs text-[#B8C5C6] leading-relaxed">
                Reflects elevated intracellular NAD+ concentrations and low systemic inflammatory burden.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-[#0B1F2A]/60 p-4 border border-[rgba(47,183,177,0.15)]">
                <p className="text-xs font-bold text-white mb-1">Longevity Acceleration</p>
                <p className="text-xs text-[#2FB7B1] leading-relaxed">
                  Consistent GLP-1 metabolic compliance and daily Berberine supplementation have lowered your biological pace of aging by 14% over 90 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cellular Vitality Pillars */}
        <div>
          <h3 className="mb-4 text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Mitochondrial & Cellular Energy Pillars
          </h3>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cellularPillars.map((pillar) => (
              <div
                key={pillar.name}
                onClick={() => setSelectedPillar(pillar.name)}
                className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl transition-all cursor-pointer hover:border-[#2FB7B1]/50"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-2">
                    <span className="font-semibold text-white">{pillar.name}</span>
                    <Sparkles className="h-4 w-4" style={{ color: pillar.color }} />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: pillar.color }}>
                      {pillar.score}
                    </span>
                    <span className="text-xs text-[#B8C5C6]">/ 100</span>
                  </div>
                  <p className="text-xs font-medium text-white mt-1">{pillar.sub}</p>
                  <p className="text-xs text-[#B8C5C6] mt-2 leading-relaxed">{pillar.note}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[rgba(47,183,177,0.1)]">
                  <div className="w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pillar.score}%`, backgroundColor: pillar.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Energy Curve (Continuous Vitality Telemetry) */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Daily Energy & Alertness Curve
              </h3>
              <p className="text-xs text-[#B8C5C6]">Subjective and continuous biometric energy mapping</p>
            </div>
            <span className="rounded-full bg-[#2FB7B1]/10 px-3 py-1 text-xs font-semibold text-[#2FB7B1]">
              Average: 7.9 / 10
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {energyCheckpoints.map((cp) => (
              <div
                key={cp.time}
                className="rounded-xl bg-[#1E4D57]/30 p-4 border border-[rgba(47,183,177,0.12)] space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{cp.time}</span>
                  <span className="font-bold text-[#2FB7B1] text-sm">{cp.level} / 10</span>
                </div>
                <p className="text-xs text-[#B8C5C6] leading-relaxed">{cp.note}</p>
                <div className="pt-2 flex items-center gap-1.5 text-[10px] text-[#2FB7B1] font-semibold">
                  <CheckCircle2 className="h-3 w-3" /> Peak Metabolic Stability
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplement & Lab Synergy Flywheel */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to verify cellular NAD+ & Methylation?
            </h4>
            <p className="text-xs text-[#B8C5C6] mt-1 max-w-xl">
              Validate your mitochondrial rejuvenation with our at-home epigenetic longevity test kit.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="rounded-lg bg-[#2FB7B1] px-6 py-2.5 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md shrink-0 text-center"
          >
            Explore Vitality Stack →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
