import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Watch,
  Activity,
  Moon,
  Heart,
  Flame,
  Plus,
  RefreshCw,
  CheckCircle2,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/wearables")({
  head: () => ({
    meta: [
      { title: "Wearables & Tracking — e6health" },
      { name: "description", content: "Real-time wearable telemetry from Apple Watch, Oura, and health sensors." },
    ],
  }),
  component: WearablesPage,
});

const connectedDevices = [
  { name: "Apple Watch Series 8", type: "Continuous Heart Rate & Movement", status: "Connected", lastSync: "2 minutes ago", battery: "84%" },
  { name: "Oura Ring Gen 3", type: "Sleep Architecture & Nightly HRV", status: "Connected", lastSync: "5 minutes ago", battery: "92%" },
];

const weeklyData = [
  { day: "Mon", steps: 7200, sleep: 7.2, hrv: 48 },
  { day: "Tue", steps: 8100, sleep: 7.8, hrv: 50 },
  { day: "Wed", steps: 6500, sleep: 7.1, hrv: 45 },
  { day: "Thu", steps: 7800, sleep: 7.6, hrv: 52 },
  { day: "Fri", steps: 8500, sleep: 8.0, hrv: 55 },
  { day: "Sat", steps: 9200, sleep: 8.2, hrv: 58 },
  { day: "Sun", steps: 6234, sleep: 7.5, hrv: 52 },
];

const sleepStages = [
  { stage: "Deep Sleep", duration: "2.5h", percentage: 33, color: "#2FB7B1" },
  { stage: "REM Sleep", duration: "1.5h", percentage: 20, color: "#259E99" },
  { stage: "Light Sleep", duration: "3.0h", percentage: 40, color: "#C2A46D" },
  { stage: "Awake", duration: "0.5h", percentage: 7, color: "#DE3C30" },
];

const activityLevels = [
  { type: "Sedentary (Desk work)", minutes: 480, percentage: 40, color: "#B8C5C6" },
  { type: "Light Activity (Walking/Chores)", minutes: 360, percentage: 30, color: "#2FB7B1" },
  { type: "Moderate Activity (Brisk walk)", minutes: 240, percentage: 20, color: "#C2A46D" },
  { type: "Intense Hypertrophy (Training)", minutes: 120, percentage: 10, color: "#DE3C30" },
];

function WearablesPage() {
  const [syncing, setSyncing] = useState(false);
  const [showPairModal, setShowPairModal] = useState(false);

  const handleSyncNow = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1500);
  };

  return (
    <DashboardLayout title="Wearables">
      <div className="mx-auto max-w-[1500px] space-y-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.1)] pb-6 md:flex-row md:items-center">
          <div>
            <h2
              className="text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Wearables & Biometric Tracking
            </h2>
            <p className="mt-1 text-sm text-[#B8C5C6]">
              Real-time physiological telemetry calibrated directly into your longevity protocol.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncNow}
              disabled={syncing}
              className="flex items-center gap-2 rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin text-[#2FB7B1]" : ""}`} />
              {syncing ? "Syncing Biometrics..." : "Sync Devices"}
            </button>
            <button
              onClick={() => setShowPairModal(true)}
              className="flex items-center gap-2 rounded-lg bg-[#2FB7B1] px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all"
            >
              <Plus className="h-4 w-4" /> Pair New Sensor
            </button>
          </div>
        </div>

        {/* Connected Devices Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {connectedDevices.map((dev) => (
            <div
              key={dev.name}
              className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2FB7B1]">Sensor</span>
                    <h4 className="text-base font-bold text-white mt-0.5">{dev.name}</h4>
                    <p className="text-xs text-[#B8C5C6] mt-1">{dev.type}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2FB7B1]/15 text-[#2FB7B1]">
                    <Watch className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(47,183,177,0.1)] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#2FB7B1] font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {dev.status}
                </span>
                <span className="text-[#B8C5C6]">Battery: {dev.battery}</span>
              </div>
            </div>
          ))}

          <div
            onClick={() => setShowPairModal(true)}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[rgba(47,183,177,0.25)] bg-[#132F3A]/40 p-6 text-center cursor-pointer transition-colors hover:border-[#2FB7B1]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E4D57] text-[#2FB7B1] mb-2">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-white">Connect More Devices</p>
            <p className="text-xs text-[#B8C5C6] mt-1">Garmin, Whoop 4.0, Continuous Glucose Monitor (CGM)</p>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-2">
              <span className="font-semibold text-white">Daily Steps</span>
              <Activity className="h-4 w-4 text-[#2FB7B1]" />
            </div>
            <p className="text-3xl font-bold text-white">6,234</p>
            <div className="mt-3 w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
              <div className="bg-[#2FB7B1] h-full" style={{ width: "78%" }} />
            </div>
            <p className="text-[11px] text-[#B8C5C6] mt-2">Goal: 8,000 steps (78% reached)</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-2">
              <span className="font-semibold text-white">Sleep Duration</span>
              <Moon className="h-4 w-4 text-[#C2A46D]" />
            </div>
            <p className="text-3xl font-bold text-white">7.5h</p>
            <div className="mt-3 w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
              <div className="bg-[#C2A46D] h-full" style={{ width: "94%" }} />
            </div>
            <p className="text-[11px] text-[#B8C5C6] mt-2">Goal: 8.0h (94% reached)</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-2">
              <span className="font-semibold text-white">Heart Rate Variability</span>
              <Zap className="h-4 w-4 text-[#259E99]" />
            </div>
            <p className="text-3xl font-bold text-[#2FB7B1]">52 ms</p>
            <p className="text-[11px] text-[#2FB7B1] mt-3 font-semibold">✓ Optimal parasympathetic recovery</p>
            <p className="text-[11px] text-[#B8C5C6] mt-0.5">Baseline: 45–55 ms</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-2">
              <span className="font-semibold text-white">Resting Heart Rate</span>
              <Heart className="h-4 w-4 text-[#DE3C30]" />
            </div>
            <p className="text-3xl font-bold text-white">58 bpm</p>
            <p className="text-[11px] text-[#2FB7B1] mt-3 font-semibold">✓ Athletic cardiovascular range</p>
            <p className="text-[11px] text-[#B8C5C6] mt-0.5">Down 4 bpm since GLP-1 start</p>
          </div>
        </div>

        {/* 7-Day Activity Trends Chart */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                7-Day Step Progression
              </h3>
              <p className="text-xs text-[#B8C5C6]">Consistent daily movement supports glycemic sensitivity</p>
            </div>
            <span className="text-xs font-semibold text-[#2FB7B1]">Weekly Average: 7,647 steps</span>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(47,183,177,0.1)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#B8C5C6" fontSize={12} tickLine={false} />
                <YAxis stroke="#B8C5C6" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E4D57",
                    border: "1px solid rgba(47,183,177,0.2)",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                  labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                />
                <Bar dataKey="steps" fill="#2FB7B1" radius={[4, 4, 0, 0]} name="Steps Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Architecture & Activity Breakdown */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sleep Architecture */}
          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sleep Architecture (Last Night)
                </h3>
                <p className="text-xs text-[#B8C5C6]">7.5 hours total sleep · 92% sleep efficiency</p>
              </div>
              <Moon className="h-5 w-5 text-[#C2A46D]" />
            </div>

            {/* Visual Stacked Bar */}
            <div className="my-6 flex h-4 w-full overflow-hidden rounded-full bg-[#1E4D57]">
              {sleepStages.map((stage) => (
                <div
                  key={stage.stage}
                  style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                  title={`${stage.stage}: ${stage.duration}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {sleepStages.map((stage) => (
                <div key={stage.stage} className="rounded-lg bg-[#0B1F2A]/40 p-3 border border-[rgba(47,183,177,0.08)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-xs text-[#B8C5C6]">{stage.stage}</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-white">{stage.duration}</span>
                    <span className="text-xs font-semibold text-[#2FB7B1]">{stage.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Distribution */}
          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Daily Activity Distribution
                </h3>
                <p className="text-xs text-[#B8C5C6]">Metabolic expenditure breakdown</p>
              </div>
              <Flame className="h-5 w-5 text-[#DE3C30]" />
            </div>

            <div className="space-y-4 my-6">
              {activityLevels.map((act) => (
                <div key={act.type}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#B8C5C6]">{act.type}</span>
                    <span className="font-bold text-white">{act.minutes} min ({act.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${act.percentage}%`, backgroundColor: act.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-[#1E4D57]/40 p-3 border border-[rgba(47,183,177,0.1)] text-xs text-[#B8C5C6]">
              <span className="font-bold text-[#2FB7B1]">Readiness Score: 78/100. </span>
              Optimal recovery profile. Ready for higher resistance volume today.
            </div>
          </div>
        </div>
      </div>

      {/* Pair Sensor Modal */}
      {showPairModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[rgba(47,183,177,0.3)] bg-[#132F3A] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pair New Sensor
            </h3>
            <p className="text-xs text-[#B8C5C6] mb-5">
              Select your wearable ecosystem to initiate Bluetooth & HealthKit sync.
            </p>
            <div className="space-y-3 mb-6">
              {["Whoop 4.0", "Garmin Connect", "Dexcom G7 / Freestyle Libre CGM", "Withings Smart Scale"].map(
                (device) => (
                  <button
                    key={device}
                    onClick={() => {
                      alert(`Initiating Bluetooth pairing with ${device}...`);
                      setShowPairModal(false);
                    }}
                    className="w-full flex items-center justify-between rounded-xl bg-[#1E4D57]/50 p-4 border border-[rgba(47,183,177,0.15)] text-left hover:border-[#2FB7B1] transition-all text-white text-xs font-semibold"
                  >
                    <span>{device}</span>
                    <span className="text-[#2FB7B1]">Connect →</span>
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setShowPairModal(false)}
              className="w-full rounded-lg border border-[rgba(47,183,177,0.3)] py-2.5 text-xs font-semibold text-white hover:bg-[#1E4D57]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
