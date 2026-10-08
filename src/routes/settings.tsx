import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Bell,
  Watch,
  Shield,
  Check,
  Save,
  Download,
  Key,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Profile — e6health" },
      { name: "description", content: "Manage your profile, protocol preferences, notifications, and privacy." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@e6health.com",
    phone: "+971 50 892 4110",
    location: "Dubai, United Arab Emirates",
    protocolTier: "GLP-1 Longevity Optimization (Active)",
    fastingWindow: "16:8 (Fasting 7 PM – 11 AM)",
  });

  const [notifications, setNotifications] = useState({
    protocolReminders: true,
    biomarkerAlerts: true,
    aiInsights: true,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="mx-auto max-w-[1200px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.1)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Settings & Preferences
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Manage your personal telemetry, privacy, and protocol defaults.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-5 sm:px-6 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all w-full sm:w-auto"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Changes Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Preferences
              </>
            )}
          </button>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl md:p-8">
          <div className="mb-4 sm:mb-6 flex items-center gap-2 text-white font-bold text-base sm:text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            <User className="h-5 w-5 text-[#2FB7B1]" /> Profile Information
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[rgba(47,183,177,0.1)]">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2FB7B1] to-[#259E99] text-xl sm:text-2xl font-bold text-white shadow-xl">
              SJ
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">{profile.name}</h3>
              <p className="text-xs text-[#2FB7B1] font-semibold">{profile.protocolTier}</p>
              <p className="text-[11px] sm:text-xs text-[#B8C5C6]">Member since January 2026 · ID: E6-904128</p>
            </div>
            <div className="sm:ml-auto">
              <button
                onClick={() => alert("Upload photo feature coming in next build.")}
                className="w-full sm:w-auto rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all text-center"
              >
                Change Avatar
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="font-semibold text-white block mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg bg-[#1E4D57]/40 p-3 text-white border border-[rgba(47,183,177,0.15)] focus:border-[#2FB7B1] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-white block mb-1.5">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-lg bg-[#1E4D57]/40 p-3 text-white border border-[rgba(47,183,177,0.15)] focus:border-[#2FB7B1] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-white block mb-1.5">Phone (SMS alerts)</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full rounded-lg bg-[#1E4D57]/40 p-3 text-white border border-[rgba(47,183,177,0.15)] focus:border-[#2FB7B1] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-white block mb-1.5">Primary Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full rounded-lg bg-[#1E4D57]/40 p-3 text-white border border-[rgba(47,183,177,0.15)] focus:border-[#2FB7B1] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Health & Protocol Defaults */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl md:p-8">
          <div className="mb-6 flex items-center gap-2 text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Key className="h-5 w-5 text-[#C2A46D]" /> Protocol Calibration Preferences
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="font-semibold text-white block mb-1.5">Fasting Regimen</label>
              <select
                value={profile.fastingWindow}
                onChange={(e) => setProfile({ ...profile, fastingWindow: e.target.value })}
                className="w-full rounded-lg bg-[#1E4D57]/40 p-3 text-white border border-[rgba(47,183,177,0.15)] focus:border-[#2FB7B1] focus:outline-none"
              >
                <option>16:8 (Fasting 7 PM – 11 AM)</option>
                <option>14:10 (Fasting 8 PM – 10 AM)</option>
                <option>12:12 (Gentle circadian alignment)</option>
                <option>Custom window</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-white block mb-1.5">Primary Target</label>
              <select className="w-full rounded-lg bg-[#1E4D57]/40 p-3 text-white border border-[rgba(47,183,177,0.15)] focus:border-[#2FB7B1] focus:outline-none">
                <option>GLP-1 Metabolic Optimization & Longevity</option>
                <option>Hypertrophy & Muscle Sparing</option>
                <option>Insulin Sensitivity & HbA1c Reversal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl md:p-8">
          <div className="mb-6 flex items-center gap-2 text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Bell className="h-5 w-5 text-[#2FB7B1]" /> Notification Alerts
          </div>

          <div className="divide-y divide-[rgba(47,183,177,0.1)] text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Daily Protocol Reminders</p>
                <p className="text-[#B8C5C6]">Berberine, step milestones, and hydration timing.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.protocolReminders}
                onChange={(e) => setNotifications({ ...notifications, protocolReminders: e.target.checked })}
                className="h-4 w-4 rounded accent-[#2FB7B1]"
              />
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Biomarker & Lab Alerts</p>
                <p className="text-[#B8C5C6]">Get notified when new test results are ingested.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.biomarkerAlerts}
                onChange={(e) => setNotifications({ ...notifications, biomarkerAlerts: e.target.checked })}
                className="h-4 w-4 rounded accent-[#2FB7B1]"
              />
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">AI Coach Longevity Tips</p>
                <p className="text-[#B8C5C6]">Personalized nudges based on Oura sleep & HRV telemetry.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.aiInsights}
                onChange={(e) => setNotifications({ ...notifications, aiInsights: e.target.checked })}
                className="h-4 w-4 rounded accent-[#2FB7B1]"
              />
            </div>
          </div>
        </div>

        {/* Security & Data Privacy */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl md:p-8">
          <div className="mb-4 flex items-center gap-2 text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Shield className="h-5 w-5 text-[#2FB7B1]" /> Security & Medical Data Governance
          </div>
          <p className="text-xs text-[#B8C5C6] leading-relaxed mb-6">
            Your physiological data and genetic markers are encrypted with AES-256 and compliant with UAE Health Data
            Protection laws (Federal Law No. 2 of 2019) and HIPAA standards.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => alert("Generating full encrypted health telemetry export...")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all text-center"
            >
              <Download className="h-4 w-4" /> Download Medical Data Archive (JSON/PDF)
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
