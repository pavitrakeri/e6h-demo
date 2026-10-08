import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  ScanLine,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  FileText,
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
import { DailySymptomTracker } from "@/components/DailySymptomTracker";
import { FoodScanner } from "@/components/FoodScanner";
import { BusyDayWidget } from "@/components/BusyDayWidget";
import { LabTestsWidget } from "@/components/LabTestsWidget";
import { SupplementsStackWidget } from "@/components/SupplementsStackWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "e6health Patient Dashboard" },
      { name: "description", content: "View your personalized longevity score, daily protocol, biomarkers, nutrition, and wellness check-in." },
      { property: "og:title", content: "e6health Patient Dashboard" },
      { property: "og:description", content: "Your daily view of personalized health progress, protocol, biomarkers, and nutrition." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DashboardPage,
});

const trendData = [
  { month: "Jan", glucose: 98, hba1c: 5.8 },
  { month: "Feb", glucose: 95, hba1c: 5.5 },
  { month: "Mar", glucose: 93, hba1c: 5.3 },
  { month: "Apr", glucose: 92, hba1c: 5.1 },
];

const keyBiomarkers = [
  { name: "Glucose", value: 92, unit: "mg/dL", status: "optimal", trend: -2 },
  { name: "HbA1c", value: 5.1, unit: "%", status: "optimal", trend: -0.3 },
  { name: "LDL", value: 118, unit: "mg/dL", status: "borderline", trend: 5 },
  { name: "HDL", value: 62, unit: "mg/dL", status: "optimal", trend: 2 },
];

const todayProtocol = [
  { action: "Take Berberine supplement", time: "8:00 AM" },
  { action: "Walk 8,000 steps", time: "Throughout day" },
  { action: "Prioritize protein at meals", time: "All meals" },
];

const wearableData = {
  steps: 6234,
  sleep: 7.5,
  hrv: 52,
};

const nutritionPlan = [
  { name: "Breakfast", meal: "Egg white scramble with spinach", time: "7:00 AM" },
  { name: "Lunch", meal: "Grilled chicken with roasted vegetables", time: "12:30 PM" },
  { name: "Dinner", meal: "Salmon with quinoa and broccoli", time: "6:30 PM" },
];

const upcomingEvents = [
  { type: "Lab Test", date: "May 15, 2026", daysUntil: 9, desc: "Comprehensive Metabolic & Lipid Panel" },
  { type: "Assessment", date: "May 20, 2026", daysUntil: 14, desc: "Quarterly Physician Longevity Review" },
];

function DashboardPage() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [eventsModalOpen, setEventsModalOpen] = useState(false);
  const [scannedFoods, setScannedFoods] = useState<any[]>([]);

  const handleFoodScanned = (food: any) => {
    setScannedFoods((prev) => [food, ...prev]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-[#2FB7B1]";
      case "borderline":
        return "text-[#C77066]";
      case "warning":
        return "text-[#DE3C30]";
      default:
        return "text-[#B8C5C6]";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-[rgba(47,183,177,0.1)]";
      case "borderline":
        return "bg-[rgba(199,112,102,0.1)]";
      case "warning":
        return "bg-[rgba(222,60,48,0.1)]";
      default:
        return "bg-[rgba(184,197,198,0.1)]";
    }
  };

  // Longevity score circle calculation
  const score = 78;
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29
  const strokeDashoffset = circumference * (1 - score / 100);

  return (
    <DashboardLayout title="Welcome back, Sarah">
      <div className="mx-auto max-w-[1500px] space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Banner */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-r from-[#1E4D57] to-[#132F3A] p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your Longevity Journey
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
                You're on day 45 of your GLP-1 optimization protocol. Keep up the excellent progress!
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
              <span className="text-[10px] sm:text-xs text-[#B8C5C6]">Protocol Status</span>
              <span className="rounded-lg bg-[#2FB7B1] px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-[#0B1F2A] shadow-md">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* 4 Cards Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Longevity Score (Exact SVG Circular Gauge) */}
          <div className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-5 sm:p-6 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Longevity Score
            </h3>
            <div className="flex flex-col items-center justify-center py-3 sm:py-4">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="rgba(47,183,177,0.2)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#2FB7B1"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-[#2FB7B1]">{score}</span>
                  <p className="text-[10px] text-[#B8C5C6]">out of 100</p>
                </div>
              </div>
              <p className="mt-3 text-xs font-semibold text-[#2FB7B1]">Excellent metabolic health</p>
            </div>
            <p className="text-center text-[10px] text-[#B8C5C6]">Calibrated daily</p>
          </div>

          {/* Today's Protocol */}
          <div className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-5 sm:p-6 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Today's Protocol
            </h3>
            <div className="space-y-3">
              {todayProtocol.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-2 w-2 rounded-full bg-[#2FB7B1] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium text-white">{item.action}</p>
                    <p className="text-[10px] text-[#B8C5C6]">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/protocol" className="mt-4 text-xs font-semibold text-[#2FB7B1] hover:underline">
              View full protocol →
            </Link>
          </div>

          {/* Wearable Data */}
          <div className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-5 sm:p-6 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wearable Data
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between rounded-lg bg-[#1E4D57] p-3">
                <span className="text-xs text-[#B8C5C6]">Steps</span>
                <span className="text-sm font-semibold text-white">{wearableData.steps.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#1E4D57] p-3">
                <span className="text-xs text-[#B8C5C6]">Sleep</span>
                <span className="text-sm font-semibold text-white">{wearableData.sleep}h</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#1E4D57] p-3">
                <span className="text-xs text-[#B8C5C6]">HRV</span>
                <span className="text-sm font-semibold text-white">{wearableData.hrv} ms</span>
              </div>
            </div>
            <Link to="/wearables" className="mt-3 text-xs font-semibold text-[#2FB7B1] hover:underline">
              Detailed tracking →
            </Link>
          </div>

          {/* Supplement Stack Widget */}
          <SupplementsStackWidget />
        </div>

        {/* Key Biomarkers */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-4 sm:p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Key Biomarkers
            </h3>
            <Link to="/biomarkers" className="text-xs font-semibold text-[#2FB7B1] hover:text-[#259E99] transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {keyBiomarkers.map((b) => (
              <div
                key={b.name}
                className={`rounded-lg border border-[rgba(47,183,177,0.1)] p-3 sm:p-4 ${getStatusBg(b.status)}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[11px] sm:text-xs text-[#B8C5C6] font-medium truncate">{b.name}</p>
                  <div className="flex items-center gap-1">
                    {b.trend < 0 ? (
                      <TrendingDown className="h-3.5 w-3.5 text-[#2FB7B1]" />
                    ) : (
                      <TrendingUp className="h-3.5 w-3.5 text-[#C77066]" />
                    )}
                    <span className={`text-[11px] sm:text-xs font-semibold ${b.trend < 0 ? "text-[#2FB7B1]" : "text-[#C77066]"}`}>
                      {Math.abs(b.trend)}
                    </span>
                  </div>
                </div>
                <p className={`text-xl sm:text-2xl font-bold ${getStatusColor(b.status)}`}>{b.value}</p>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-[#B8C5C6]">{b.unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Biomarker Trends (AreaChart with Gradient) */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-4 sm:p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Biomarker Trends
              </h3>
              <p className="text-xs text-[#B8C5C6]">Continuous metabolic tracking</p>
            </div>
            <span className="text-xs text-[#2FB7B1] font-medium bg-[#2FB7B1]/10 px-2.5 py-1 rounded-full">
              Glucose Control
            </span>
          </div>
          <div className="h-56 sm:h-64 w-full pt-2 min-w-0 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2FB7B1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2FB7B1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(47,183,177,0.1)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#B8C5C6" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis domain={[80, 110]} stroke="#B8C5C6" fontSize={11} tickLine={false} axisLine={false} />
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
                  dataKey="glucose"
                  stroke="#2FB7B1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorGlucose)"
                  name="Glucose (mg/dL)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Food Scanner CTA & Today's Nutrition Plan */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
          <button
            onClick={() => setScannerOpen(true)}
            className="flex min-h-[140px] sm:min-h-[180px] flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-gradient-to-br from-[#2FB7B1] to-[#259E99] p-5 sm:p-6 shadow-lg transition-all transform hover:scale-[1.02] text-center"
          >
            <ScanLine className="h-8 w-8 sm:h-10 sm:w-10 text-[#0B1F2A]" />
            <div>
              <p className="text-sm font-bold text-[#0B1F2A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                AI Food Scanner
              </p>
              <p className="mt-1 text-xs text-[#0B1F2A] opacity-85">Scan meals instantly</p>
            </div>
          </button>

          <div className="lg:col-span-3 rounded-lg border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Today's Nutrition Plan
              </h3>
              <Link to="/nutrition" className="text-xs font-semibold text-[#2FB7B1] hover:text-[#259E99] transition-colors">
                View Full Plan →
              </Link>
            </div>
            <div className="space-y-2.5">
              {nutritionPlan.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-[#1E4D57] p-3">
                  <div>
                    <p className="text-xs font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-[#B8C5C6]">{item.meal}</p>
                  </div>
                  <p className="shrink-0 text-xs text-[#B8C5C6]">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lab Tests Available Widget */}
        <LabTestsWidget />

        {/* Scanned Foods Row (Shows when user scans items) */}
        {scannedFoods.length > 0 && (
          <div className="rounded-lg border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Today's Scanned Foods
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {scannedFoods.map((x) => (
                <div key={x.id} className="rounded-lg bg-[#1E4D57] p-3 border border-[rgba(47,183,177,0.1)]">
                  {x.image && <img src={x.image} alt={x.name} className="w-full h-24 object-cover rounded-lg mb-2" />}
                  <p className="text-white font-semibold text-xs mb-2">{x.name}</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div>
                      <p className="text-[#B8C5C6]">Calories</p>
                      <p className="text-[#2FB7B1] font-bold">{x.calories}</p>
                    </div>
                    <div>
                      <p className="text-[#B8C5C6]">Protein</p>
                      <p className="text-[#C2A46D] font-bold">{x.protein}g</p>
                    </div>
                    <div>
                      <p className="text-[#B8C5C6]">Carbs</p>
                      <p className="text-[#259E99] font-bold">{x.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-[#B8C5C6]">Fat</p>
                      <p className="text-[#C77066] font-bold">{x.fat}g</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Busy Day Smart Delivery Widget */}
        <BusyDayWidget />

        {/* Daily Symptom Tracker & Side Actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DailySymptomTracker />

          <div className="space-y-4">
            {/* Daily Check-in Card */}
            <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-gradient-to-br from-[#2FB7B1] to-[#259E99] p-6 shadow-lg text-[#0B1F2A]">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Daily Check-in
                </h3>
                <span className="rounded-full bg-white/30 px-2.5 py-0.5 text-xs font-semibold">
                  New
                </span>
              </div>
              <p className="text-sm mb-4 opacity-90">
                How are you feeling today? Your response helps us continuously optimize your GLP-1 protocol.
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }}
                className="w-full rounded-lg bg-[#0B1F2A] py-2.5 text-sm font-semibold text-[#2FB7B1] hover:bg-[#132F3A] transition-colors"
              >
                Start Check-in
              </button>
            </div>

            {/* Upcoming Events Button */}
            <button
              onClick={() => setEventsModalOpen(true)}
              className="w-full rounded-lg border border-[rgba(47,183,177,0.1)] bg-[#132F3A] p-6 shadow-lg hover:border-[rgba(47,183,177,0.3)] transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#2FB7B1]" />
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Upcoming Events
                  </p>
                  <p className="text-xs text-[#B8C5C6]">{upcomingEvents.length} events scheduled in next 14 days</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col justify-between gap-2 border-t border-[rgba(47,183,177,0.1)] py-5 text-xs text-[#B8C5C6] sm:flex-row">
          <span>© 2026 e6health. Your health data, simplified.</span>
          <span>For wellness guidance only · Not medical advice</span>
        </footer>
      </div>

      {/* Food Scanner Modal */}
      <FoodScanner isOpen={scannerOpen} onClose={() => setScannerOpen(false)} onScanComplete={handleFoodScanned} />

      {/* Upcoming Events Modal */}
      {eventsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(47,183,177,0.3)] bg-[#132F3A] p-4 sm:p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[rgba(47,183,177,0.15)] pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Upcoming Events & Milestones
              </h3>
              <button
                onClick={() => setEventsModalOpen(false)}
                className="p-1 rounded text-[#B8C5C6] hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((evt, i) => (
                <div key={i} className="rounded-xl bg-[#1E4D57]/40 p-3.5 sm:p-4 border border-[rgba(47,183,177,0.15)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#2FB7B1]">{evt.type}</span>
                    <span className="text-[10px] text-[#C2A46D] font-bold">in {evt.daysUntil} days</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{evt.desc}</p>
                  <p className="text-[11px] sm:text-xs text-[#B8C5C6] mt-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#2FB7B1]" /> {evt.date}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setEventsModalOpen(false)}
              className="mt-6 w-full rounded-lg bg-[#2FB7B1] py-2.5 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}