import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download,
  Upload,
  FileText,
  Calendar,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/biomarkers")({
  head: () => ({
    meta: [
      { title: "My Biomarkers — e6health" },
      { name: "description", content: "Track all your key metabolic, lipid, inflammatory, and organ biomarkers over time." },
    ],
  }),
  component: BiomarkersPage,
});

const trendData = [
  { date: "Jan 15", glucose: 98, hba1c: 5.8, ldl: 125, hdl: 58 },
  { date: "Feb 15", glucose: 95, hba1c: 5.5, ldl: 122, hdl: 60 },
  { date: "Mar 15", glucose: 93, hba1c: 5.3, ldl: 120, hdl: 61 },
  { date: "Apr 15", glucose: 92, hba1c: 5.1, ldl: 118, hdl: 62 },
];

interface Marker {
  name: string;
  value: number;
  unit: string;
  range: string;
  status: "optimal" | "borderline" | "warning";
  change: number;
}

interface CategoryGroup {
  category: string;
  markers: Marker[];
}

const biomarkerCategories: CategoryGroup[] = [
  {
    category: "Glucose Control",
    markers: [
      { name: "Fasting Glucose", value: 92, unit: "mg/dL", range: "70-100", status: "optimal", change: -2 },
      { name: "HbA1c", value: 5.1, unit: "%", range: "<5.7", status: "optimal", change: -0.3 },
      { name: "Insulin", value: 8.2, unit: "mIU/L", range: "<12", status: "optimal", change: -1.5 },
    ],
  },
  {
    category: "Lipid Panel",
    markers: [
      { name: "Total Cholesterol", value: 198, unit: "mg/dL", range: "<200", status: "optimal", change: -5 },
      { name: "LDL Cholesterol", value: 118, unit: "mg/dL", range: "<100", status: "borderline", change: 5 },
      { name: "HDL Cholesterol", value: 62, unit: "mg/dL", range: ">40", status: "optimal", change: 2 },
      { name: "Triglycerides", value: 95, unit: "mg/dL", range: "<150", status: "optimal", change: -8 },
    ],
  },
  {
    category: "Inflammation Markers",
    markers: [
      { name: "hs-CRP", value: 0.8, unit: "mg/L", range: "<1.0", status: "optimal", change: -0.2 },
      { name: "ESR", value: 12, unit: "mm/hr", range: "<20", status: "optimal", change: -2 },
    ],
  },
  {
    category: "Liver & Kidney",
    markers: [
      { name: "ALT (Liver)", value: 28, unit: "U/L", range: "<40", status: "optimal", change: -3 },
      { name: "Creatinine (Kidney)", value: 0.9, unit: "mg/dL", range: "0.7-1.3", status: "optimal", change: 0 },
    ],
  },
];

const labHistory = [
  { date: "April 15, 2026", lab: "Quest Diagnostics", status: "Complete", tests: "Full Metabolic Panel" },
  { date: "March 15, 2026", lab: "LabCorp", status: "Complete", tests: "Lipids & Glucose Check" },
  { date: "February 15, 2026", lab: "Quest Diagnostics", status: "Complete", tests: "Comprehensive Longevity Stack" },
  { date: "January 15, 2026", lab: "LabCorp", status: "Complete", tests: "Baseline Biomarker Panel" },
];

function BiomarkersPage() {
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const getStatusColor = (status: Marker["status"]) => {
    switch (status) {
      case "optimal":
        return "text-[#2FB7B1]";
      case "borderline":
        return "text-[#C2A46D]";
      case "warning":
        return "text-[#DE3C30]";
      default:
        return "text-[#B8C5C6]";
    }
  };

  const getStatusBadgeBg = (status: Marker["status"]) => {
    switch (status) {
      case "optimal":
        return "bg-[#2FB7B1]/15 text-[#2FB7B1] border-[#2FB7B1]/30";
      case "borderline":
        return "bg-[#C2A46D]/15 text-[#C2A46D] border-[#C2A46D]/30";
      case "warning":
        return "bg-[#DE3C30]/15 text-[#DE3C30] border-[#DE3C30]/30";
      default:
        return "bg-[#B8C5C6]/15 text-[#B8C5C6] border-[#B8C5C6]/30";
    }
  };

  const handleSimulatedUpload = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
    }, 2000);
  };

  const filteredCategories =
    filterCategory === "All"
      ? biomarkerCategories
      : biomarkerCategories.filter((c) => c.category === filterCategory);

  return (
    <DashboardLayout title="My Biomarkers">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.1)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Biomarkers
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Last updated: April 15, 2026 · Total 15 calibrated longevity indicators
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 sm:px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all"
            >
              <Download className="h-4 w-4" /> Download Report
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-4 sm:px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all"
            >
              <Upload className="h-4 w-4" /> Upload New Results
            </button>
          </div>
        </div>

        {/* Upload Dropzone Card */}
        <div className="rounded-xl border border-dashed border-[rgba(47,183,177,0.3)] bg-[#132F3A]/70 p-5 sm:p-8 text-center shadow-xl">
          <Upload className="mx-auto mb-2 sm:mb-3 h-10 w-10 sm:h-12 sm:w-12 text-[#2FB7B1]" />
          <h3 className="text-base sm:text-lg font-bold text-white">Upload New Lab Results</h3>
          <p className="mt-1 text-xs text-[#B8C5C6] max-w-md mx-auto">
            Drag and drop your PDF or image from Quest, LabCorp, or any certified UAE clinic
          </p>
          <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="rounded-lg bg-[#2FB7B1] px-4 sm:px-5 py-2 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md"
            >
              Choose PDF / Photo
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 sm:px-5 py-2 text-xs font-semibold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all"
            >
              Enter Manually
            </button>
          </div>
        </div>

        {/* Trends Chart */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Biomarker Trends Over Time
              </h3>
              <p className="text-xs text-[#B8C5C6]">Tracking metabolic and lipid evolution across 4 months</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-[#2FB7B1] font-semibold">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2FB7B1]" /> Glucose
              </span>
              <span className="flex items-center gap-1.5 text-[#C2A46D] font-semibold">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C2A46D]" /> HbA1c
              </span>
              <span className="flex items-center gap-1.5 text-[#DE3C30] font-semibold">
                <span className="h-2.5 w-2.5 rounded-full bg-[#DE3C30]" /> LDL
              </span>
            </div>
          </div>
          <div className="h-64 sm:h-80 w-full min-w-0 overflow-hidden pt-2 sm:pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(47,183,177,0.1)" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#B8C5C6" fontSize={11} tickLine={false} />
                <YAxis stroke="#B8C5C6" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E4D57",
                    border: "1px solid rgba(47,183,177,0.2)",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                  labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                />
                <Legend wrapperStyle={{ color: "#B8C5C6", fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="glucose"
                  stroke="#2FB7B1"
                  strokeWidth={2.5}
                  dot={{ fill: "#2FB7B1", r: 4 }}
                  name="Glucose (mg/dL)"
                />
                <Line
                  type="monotone"
                  dataKey="hba1c"
                  stroke="#C2A46D"
                  strokeWidth={2.5}
                  dot={{ fill: "#C2A46D", r: 4 }}
                  name="HbA1c (%)"
                />
                <Line
                  type="monotone"
                  dataKey="ldl"
                  stroke="#DE3C30"
                  strokeWidth={2.5}
                  dot={{ fill: "#DE3C30", r: 4 }}
                  name="LDL (mg/dL)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Filters (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
          {["All", "Glucose Control", "Lipid Panel", "Inflammation Markers", "Liver & Kidney"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-3.5 sm:px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? "bg-[#2FB7B1] text-[#0B1F2A] shadow-md shadow-[#2FB7B1]/20"
                  : "bg-[#132F3A] text-[#B8C5C6] border border-[rgba(47,183,177,0.15)] hover:border-[#2FB7B1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Biomarkers By Category Cards */}
        <div className="space-y-6">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl"
            >
              <h3
                className="mb-5 text-xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {group.category}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.markers.map((marker) => (
                  <div
                    key={marker.name}
                    className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.12)] bg-[#1E4D57]/30 p-5 transition-all hover:border-[#2FB7B1]/40"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{marker.name}</p>
                          <p className="text-[11px] text-[#B8C5C6] mt-0.5">Reference: {marker.range}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {marker.change < 0 ? (
                            <TrendingDown className="h-4 w-4 text-[#2FB7B1]" />
                          ) : marker.change > 0 ? (
                            <TrendingUp className="h-4 w-4 text-[#DE3C30]" />
                          ) : null}
                          <span
                            className={`text-xs font-bold ${
                              marker.change < 0
                                ? "text-[#2FB7B1]"
                                : marker.change > 0
                                ? "text-[#DE3C30]"
                                : "text-[#B8C5C6]"
                            }`}
                          >
                            {marker.change > 0 ? `+${marker.change}` : marker.change}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-baseline gap-2">
                        <span className={`text-3xl font-bold ${getStatusColor(marker.status)}`}>
                          {marker.value}
                        </span>
                        <span className="text-xs text-[#B8C5C6]">{marker.unit}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[rgba(47,183,177,0.1)] flex items-center justify-between">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize ${getStatusBadgeBg(
                          marker.status
                        )}`}
                      >
                        {marker.status}
                      </span>
                      <span className="text-[10px] text-[#B8C5C6]">Tracked Monthly</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lab Results History */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
          <h3
            className="mb-4 text-lg sm:text-xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lab Results History
          </h3>
          <div className="divide-y divide-[rgba(47,183,177,0.1)]">
            {labHistory.map((item) => (
              <div
                key={item.date}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 sm:py-4 transition-colors hover:bg-[#1E4D57]/30 px-2 sm:px-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E4D57] text-[#2FB7B1]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">{item.date}</p>
                    <p className="text-[11px] sm:text-xs text-[#B8C5C6]">
                      {item.lab} · {item.tests}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
                  <span className="rounded-full bg-[#2FB7B1]/15 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-[#2FB7B1] border border-[#2FB7B1]/30">
                    {item.status}
                  </span>
                  <button className="text-xs font-semibold text-[#2FB7B1] hover:underline">
                    View PDF →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Lab Due Banner */}
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-[rgba(255,255,255,0.2)] bg-gradient-to-r from-[#C2A46D] to-[#E8DFC8] p-5 sm:p-8 text-[#0B1F2A] shadow-xl sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1F2A]/70 mb-1">
              <Calendar className="h-4 w-4" /> Next Milestone
            </div>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Next Comprehensive Lab Due
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#0B1F2A]/80 max-w-xl">
              Schedule your 90-day progress panel for May 15, 2026 with certified home blood draw in UAE.
            </p>
          </div>
          <Link
            to="/lab-tests"
            className="rounded-lg bg-[#0B1F2A] px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold text-[#C2A46D] shadow-lg transition-transform hover:scale-105 hover:bg-[#132F3A] whitespace-nowrap text-center"
          >
            Schedule Now →
          </Link>
        </div>
      </div>

      {/* Simulated Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(47,183,177,0.3)] bg-[#132F3A] p-4 sm:p-6 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Upload Lab Document
            </h3>
            <p className="text-xs text-[#B8C5C6] mb-4 sm:mb-5">
              Support PDF, JPG, PNG from Quest Diagnostics, LabCorp, or local hospital records.
            </p>
            {uploadSuccess ? (
              <div className="py-6 sm:py-8 text-center text-[#2FB7B1]">
                <CheckCircle2 className="mx-auto h-10 w-10 sm:h-12 sm:w-12 mb-2" />
                <p className="text-base font-bold">Results Parsed Successfully!</p>
                <p className="text-xs text-[#B8C5C6] mt-1">15 biomarkers updated to your profile.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border-2 border-dashed border-[rgba(47,183,177,0.3)] p-4 sm:p-6 text-center">
                  <Upload className="mx-auto h-7 w-7 sm:h-8 sm:w-8 text-[#2FB7B1] mb-2" />
                  <p className="text-xs text-white font-medium">Drag PDF here or browse files</p>
                  <input type="file" className="mt-3 text-xs text-[#B8C5C6] max-w-full" />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="rounded-lg border border-[rgba(47,183,177,0.3)] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E4D57]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSimulatedUpload}
                    className="rounded-lg bg-[#2FB7B1] px-5 py-2 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white"
                  >
                    Submit & Parse
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
