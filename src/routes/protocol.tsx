import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ClipboardCheck,
  Pill,
  Activity,
  Moon,
  Syringe,
  Download,
  History,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/protocol")({
  head: () => ({
    meta: [
      { title: "My Personalized Protocol — e6health" },
      { name: "description", content: "Your dynamic longevity and GLP-1 optimization protocol." },
    ],
  }),
  component: ProtocolPage,
});

interface ProtocolItem {
  name: string;
  dosage: string;
  frequency: string;
  reason: string;
}

interface ProtocolSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: ProtocolItem[];
}

const currentProtocol = {
  version: "v3.2",
  lastUpdated: "April 15, 2026",
  reason: "Lab results update - improved glucose control",
};

const protocolSections: ProtocolSection[] = [
  {
    title: "Supplements",
    icon: Pill,
    color: "#2FB7B1",
    items: [
      { name: "Berberine", dosage: "500mg", frequency: "2x daily (before meals)", reason: "Glucose regulation & AMPK activation" },
      { name: "Omega-3 (Fish Oil)", dosage: "2,000mg", frequency: "Daily with food", reason: "Lipid support & systemic anti-inflammation" },
      { name: "Magnesium Glycinate", dosage: "300mg", frequency: "Evening before bed", reason: "Deep sleep & neuromuscular recovery" },
      { name: "Chromium Picolinate", dosage: "200mcg", frequency: "With largest meal", reason: "Insulin sensitivity & craving control" },
    ],
  },
  {
    title: "Lifestyle & Movement",
    icon: Activity,
    color: "#259E99",
    items: [
      { name: "Intermittent Fasting", dosage: "14-16 hour window", frequency: "Daily (finish by 7 PM)", reason: "Autophagy & metabolic flexibility" },
      { name: "Cold Exposure", dosage: "2-3 min cold shower", frequency: "3x weekly (morning)", reason: "Brown adipose activation & dopamine boost" },
      { name: "Daily Walking", dosage: "8,000+ steps", frequency: "Throughout day", reason: "Postprandial glucose disposal" },
      { name: "Resistance Training", dosage: "45 min hypertrophy", frequency: "3x weekly", reason: "Lean muscle preservation on GLP-1" },
    ],
  },
  {
    title: "Sleep Optimization",
    icon: Moon,
    color: "#C2A46D",
    items: [
      { name: "Sleep Schedule", dosage: "10:30 PM – 6:30 AM", frequency: "Consistent daily", reason: "Circadian alignment & GH release" },
      { name: "Room Temperature", dosage: "65–68°F (18–20°C)", frequency: "Nightly", reason: "Thermoregulation for REM & Deep sleep" },
      { name: "Light Exposure", dosage: "Dim amber lights after 8 PM", frequency: "Daily", reason: "Natural melatonin secretion support" },
    ],
  },
  {
    title: "GLP-1 Medication Protocol",
    icon: Syringe,
    color: "#DE3C30",
    items: [
      { name: "Semaglutide Dose", dosage: "0.5mg subcutaneous", frequency: "Weekly (Every Sunday 9 AM)", reason: "Current maintenance dose" },
      { name: "Protein Priority", dosage: "30g+ high biological value", frequency: "All meals", reason: "Muscle preservation during caloric deficit" },
      { name: "Electrolyte Hydration", dosage: "3-4 Liters + sodium/potassium", frequency: "Daily", reason: "Mitigate GLP-1 dehydration & fatigue" },
      { name: "Meal Timing", dosage: "Small frequent portions", frequency: "Every 3-4 hours", reason: "Prevent delayed gastric emptying nausea" },
    ],
  },
];

const protocolHistory = [
  {
    version: "v3.2",
    date: "April 15, 2026",
    trigger: "Lab Results Update (Fasting glucose 92 mg/dL)",
    changes: [
      "Increased Berberine dosage from 400mg to 500mg for optimal glucose stabilization",
      "Added Chromium Picolinate (200mcg) for improved postprandial glycemic response",
      "Extended intermittent fasting window from 13-15 hours to 14-16 hours",
    ],
  },
  {
    version: "v3.1",
    date: "March 20, 2026",
    trigger: "Wearable Data Analysis (HRV elevated to 52ms)",
    changes: [
      "Adjusted bedtime target based on continuous Oura Ring circadian rhythm tracking",
      "Added morning cold exposure protocol for metabolic boost",
      "Increased resistance training frequency from 2x to 3x weekly",
    ],
  },
  {
    version: "v3.0",
    date: "March 1, 2026",
    trigger: "Initial Longevity & Physician Assessment",
    changes: [
      "Baseline protocol established with GLP-1 dosage set at 0.5mg weekly",
      "Comprehensive longevity supplement stack initiated",
      "Daily 8,000 steps habit tracker configured",
    ],
  },
];

function ProtocolPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 1000);
  };

  return (
    <DashboardLayout title="My Protocol">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.1)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Personalized Protocol
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Continuously calibrated through biomarkers, wearable telemetry, and doctor review.
            </p>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-4 sm:px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all disabled:opacity-50 w-full sm:w-auto"
          >
            <Download className="h-4 w-4" /> {downloading ? "Preparing PDF..." : "Download Protocol Summary"}
          </button>
        </div>

        {/* Current Version Banner */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-gradient-to-r from-[#2FB7B1] to-[#259E99] p-5 sm:p-6 shadow-xl text-[#0B1F2A]">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-bold opacity-80 uppercase tracking-wider">Current Protocol</p>
              <p className="text-xl sm:text-2xl font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentProtocol.version}
              </p>
              <span className="inline-block mt-1.5 rounded-full bg-[#0B1F2A] px-2.5 py-0.5 text-[10px] font-bold text-[#2FB7B1]">
                Active Calibration
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold opacity-80 uppercase tracking-wider">Last Calibrated</p>
              <p className="text-xl sm:text-2xl font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentProtocol.lastUpdated}
              </p>
              <p className="text-xs mt-1.5 opacity-90 font-medium">Next evaluation: May 15, 2026</p>
            </div>
            <div>
              <p className="text-[11px] font-bold opacity-80 uppercase tracking-wider">Update Trigger</p>
              <p className="text-sm sm:text-base font-bold mt-1 leading-snug">{currentProtocol.reason}</p>
              <p className="text-xs mt-1 opacity-90">Validated by Dr. Al-Maktoum (Longevity Specialist)</p>
            </div>
          </div>
        </div>

        {/* 4 Protocol Dimension Sections */}
        <div className="space-y-6">
          {protocolSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg shadow-md"
                      style={{ backgroundColor: `${section.color}20`, color: section.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {section.title}
                      </h3>
                      <p className="text-xs text-[#B8C5C6]">{section.items.length} prescribed items</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#2FB7B1]">Daily Adherence: 100%</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.12)] bg-[#1E4D57]/30 p-5 transition-all hover:border-[#2FB7B1]/40"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-bold text-white">{item.name}</p>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                            style={{ backgroundColor: `${section.color}20`, color: section.color }}
                          >
                            {item.dosage}
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-semibold text-[#2FB7B1]">{item.frequency}</p>
                        <p className="mt-2 text-xs text-[#B8C5C6] leading-relaxed">{item.reason}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[rgba(47,183,177,0.1)] flex items-center gap-1.5 text-[11px] text-[#2FB7B1]">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Protocol Active
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Protocol Evolution History */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <History className="h-6 w-6 text-[#2FB7B1]" />
            <div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Protocol Evolution History
              </h3>
              <p className="text-xs text-[#B8C5C6]">
                Every update is recorded with scientific rationales and data sources.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {protocolHistory.map((item, i) => (
              <div
                key={item.version}
                className="relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-0 before:w-0.5 before:bg-[rgba(47,183,177,0.2)] last:before:hidden"
              >
                <div className="absolute left-1 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2FB7B1] ring-4 ring-[#132F3A]" />
                <div className="rounded-xl border border-[rgba(47,183,177,0.12)] bg-[#1E4D57]/30 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{item.version}</span>
                      <span className="text-xs text-[#B8C5C6]">• {item.date}</span>
                    </div>
                    <span className="rounded-full bg-[#2FB7B1]/10 px-2.5 py-0.5 text-xs font-semibold text-[#2FB7B1]">
                      {item.trigger}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#B8C5C6]">
                    {item.changes.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#2FB7B1] mt-0.5 font-bold">→</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Card */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-r from-[#1E4D57] to-[#132F3A] p-6 shadow-xl">
          <div className="flex items-start gap-4">
            <Sparkles className="h-6 w-6 text-[#2FB7B1] flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-base font-bold text-white">How Your Protocol Updates Dynamically</h4>
              <p className="mt-1 text-xs text-[#B8C5C6] leading-relaxed">
                e6health ingests your daily wearable metrics (HRV, deep sleep, resting heart rate), periodic blood
                biomarkers, and self-reported wellness logs. Our algorithmic health engine continuously tests for
                adaptation plateaus and suggests micronutrient and lifestyle adjustments to ensure long-term GLP-1
                metabolic benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
