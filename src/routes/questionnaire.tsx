import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Shield,
  Activity,
  Heart,
  Dna,
  Zap,
  Check,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Scale,
  User,
  ArrowRight,
  ClipboardList,
  Flame,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/questionnaire")({
  head: () => ({
    meta: [
      { title: "Metabolic & Longevity Questionnaire — e6health" },
      {
        name: "description",
        content: "Single-page all-in-one metabolic, GLP-1 and longevity assessment without step barriers.",
      },
    ],
  }),
  component: QuestionnairePage,
});

interface QuestionnaireState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  sex: string;
  ageRange: string;
  medicalFlags: string[];
  unitsHeight: string;
  unitsWeight: string;
  heightCm: number;
  weightKg: number;
  goalWeightKg: number;
  glp1Status: string;
  path: "glp1" | "longevity" | "";
  // GLP-1 specific
  g1Duration?: string;
  g2Med?: string;
  g3Challenge?: string;
  g4MuscleAware?: string;
  // Longevity specific
  l1Goal?: string;
  l2Duration?: string;
  l3Obstacle?: string;
  // Shared
  s1Goal: string;
  s2GoalDuration: string;
  s3Nutrition: string;
  s4Exercise: number;
  s5ExerciseTypes: string[];
  s6Sleep: number;
  s7Stress: number;
  s8Supplements: string;
  s9Conditions: string[];
  s10Physician: string;
  s11Bloodwork: string;
  s12Biomarkers: string[];
  s13Wearables: string[];
  s14Motivation: string;
  s15Support: string;
  s16Source: string;
}

const defaultState: QuestionnaireState = {
  firstName: "Sarah",
  lastName: "Jenkins",
  email: "sarah.j@example.com",
  phone: "+971 50 123 4567",
  country: "UAE",
  sex: "female",
  ageRange: "30-39",
  medicalFlags: [],
  unitsHeight: "cm",
  unitsWeight: "kg",
  heightCm: 168,
  weightKg: 72,
  goalWeightKg: 62,
  glp1Status: "yes",
  path: "glp1",
  g1Duration: "3to6",
  g2Med: "mounjaro",
  g3Challenge: "muscle",
  g4MuscleAware: "yes",
  l1Goal: "longevity",
  l2Duration: "3to12",
  l3Obstacle: "consistency",
  s1Goal: "weight",
  s2GoalDuration: "3to12",
  s3Nutrition: "good",
  s4Exercise: 4,
  s5ExerciseTypes: ["Resistance / weights", "Walking", "Yoga / Pilates"],
  s6Sleep: 8,
  s7Stress: 4,
  s8Supplements: "targeted",
  s9Conditions: ["Pre-diabetes"],
  s10Physician: "yes",
  s11Bloodwork: "yes",
  s12Biomarkers: ["HbA1c", "Lipid panel", "Vitamin D", "ApoB", "Fasting glucose"],
  s13Wearables: ["Apple Watch", "Oura", "CGM"],
  s14Motivation: "consistent",
  s15Support: "ai",
  s16Source: "instagram",
};

const MEDICAL_FLAGS = [
  "Currently pregnant or breastfeeding",
  "Under 18 years of age",
  "Active cancer diagnosis",
  "History of pancreatitis or medullary thyroid carcinoma",
  "Severe gastrointestinal disease",
];

const EXERCISE_OPTIONS = [
  "Walking",
  "Running",
  "Cycling",
  "Resistance / weights",
  "Yoga / Pilates",
  "HIIT",
  "Swimming",
  "None",
];

const CONDITION_OPTIONS = [
  "Hypertension",
  "Type 2 diabetes",
  "Pre-diabetes",
  "PCOS",
  "Thyroid",
  "Autoimmune",
  "None",
];

const BIOMARKER_OPTIONS = [
  "HbA1c",
  "Fasting glucose",
  "Lipid panel",
  "Vitamin D",
  "B12",
  "Ferritin",
  "Testosterone",
  "Cortisol",
  "hs-CRP",
  "ApoB",
];

const WEARABLE_OPTIONS = ["Apple Watch", "Whoop", "Oura", "Garmin", "Fitbit", "CGM", "None"];

// Exact scoring formula from e6health profile calculation engine
function calculateReadinessScore(data: QuestionnaireState) {
  const nutritionMap: Record<string, number> = { poor: 6, fair: 13, good: 20, excellent: 25, "": 0 };
  const nutrVal = nutritionMap[data.s3Nutrition] ?? 0;

  const suppMap: Record<string, number> = { none: 4, basic: 10, targeted: 16, comprehensive: 20, "": 0 };
  const suppVal = suppMap[data.s8Supplements] ?? 0;

  let bioVal = 0;
  if (data.s11Bloodwork === "yes") bioVal += 10;
  else if (data.s11Bloodwork === "partial") bioVal += 6;
  bioVal += Math.min(10, data.s12Biomarkers.length * 2);

  const lifeVal =
    Math.min(7, data.s4Exercise) +
    Math.round((data.s6Sleep / 10) * 8) +
    Math.round(((10 - data.s7Stress) / 10) * 5);

  let glpVal = 0;
  const isGlp = data.path === "glp1" || data.glp1Status === "yes" || data.glp1Status === "prescribed";
  if (isGlp) {
    const durMap: Record<string, number> = { lt3: 4, "3to6": 8, "6to12": 11, gt12: 13 };
    glpVal += data.g1Duration ? (durMap[data.g1Duration] || 0) : 0;
    if (data.g4MuscleAware === "yes") glpVal += 4;
    else if (data.g4MuscleAware === "somewhat") glpVal += 2;
    if (data.g3Challenge && data.g3Challenge !== "none") glpVal -= 2;
    glpVal = Math.max(0, Math.min(15, glpVal));
  }

  const categoryScores = {
    Nutrition: { value: nutrVal, max: 25, color: "#2FB7B1" },
    Supplementation: { value: suppVal, max: 20, color: "#C2A46D" },
    "Biomarker Awareness": { value: bioVal, max: 20, color: "#259E99" },
    "Lifestyle & Recovery": { value: Math.min(20, lifeVal), max: 20, color: "#2FB7B1" },
    "GLP-1 Optimization": { value: glpVal, max: 15, color: "#C77066" },
  };

  const totalRaw = nutrVal + suppVal + bioVal + Math.min(20, lifeVal) + (isGlp ? glpVal : 0);
  const maxPossible = isGlp ? 100 : 85;
  let finalScore = Math.round((totalRaw / maxPossible) * 100);
  finalScore = Math.max(5, Math.min(98, finalScore));

  const personaRankings: [string, number][] = [
    ["Nutrition Builder", nutrVal / 25],
    ["Supplements Seeker", suppVal / 20],
    ["Data Decoder", bioVal / 20],
    ["Recovery Rebuilder", Math.min(20, lifeVal) / 20],
  ];
  if (isGlp) {
    personaRankings.push(["GLP-1 Optimizer", glpVal / 15]);
  }
  personaRankings.sort((a, b) => a[1] - b[1]);

  let persona = personaRankings[0][0];
  if (finalScore >= 80 && !isGlp) persona = "Longevity Strategist";
  if (finalScore < 40) persona = "Foundation Layer";

  const approved = finalScore >= 70 && data.medicalFlags.length === 0;

  return {
    score: finalScore,
    approved,
    persona,
    categoryScores,
  };
}

function QuestionnairePage() {
  const [formData, setFormData] = useState<QuestionnaireState>(defaultState);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync glp1Status with path
  const updateField = <K extends keyof QuestionnaireState>(key: K, value: QuestionnaireState[K]) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "glp1Status") {
        next.path = value === "yes" || value === "prescribed" ? "glp1" : "longevity";
      }
      return next;
    });
  };

  const toggleArrayItem = (key: "medicalFlags" | "s5ExerciseTypes" | "s9Conditions" | "s12Biomarkers" | "s13Wearables", item: string) => {
    setFormData((prev) => {
      const current = prev[key] as string[];
      let updated: string[];
      if (item === "None") {
        updated = current.includes("None") ? [] : ["None"];
      } else {
        const withoutNone = current.filter((x) => x !== "None");
        if (withoutNone.includes(item)) {
          updated = withoutNone.filter((x) => x !== item);
        } else {
          updated = [...withoutNone, item];
        }
      }
      return { ...prev, [key]: updated };
    });
  };

  const results = useMemo(() => calculateReadinessScore(formData), [formData]);

  const bmi = useMemo(() => {
    if (!formData.heightCm || !formData.weightKg) return 0;
    const heightM = formData.heightCm / 100;
    return Math.round((formData.weightKg / (heightM * heightM)) * 10) / 10;
  }, [formData.heightCm, formData.weightKg]);

  const weightDelta = formData.weightKg - formData.goalWeightKg;

  const handleSaveToProfile = () => {
    try {
      localStorage.setItem("e6h:profile", JSON.stringify({ answers: formData, ...results, completedAt: new Date().toISOString() }));
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2500);
    } catch {
      // ignore
    }
  };

  const resetForm = () => {
    setFormData({
      ...defaultState,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      medicalFlags: [],
      s5ExerciseTypes: [],
      s9Conditions: [],
      s12Biomarkers: [],
      s13Wearables: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#07151E] text-white flex flex-col font-sans selection:bg-[#2FB7B1] selection:text-[#0B1F2A]">
      {/* Standalone Independent Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-[rgba(47,183,177,0.15)] bg-[#07151E]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2FB7B1] to-[#1E4D57] grid place-items-center text-white font-bold text-sm shadow-md shadow-[#2FB7B1]/20">
                e6
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#2FB7B1] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  e6health
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-[#2FB7B1] bg-[#2FB7B1]/10 px-2 py-0.5 rounded border border-[#2FB7B1]/20 font-semibold">
                  Longevity Intake
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[rgba(47,183,177,0.2)] bg-[#132F3A]/60 px-3 py-1 text-[11px] text-[#B8C5C6]">
              <span>🇦🇪 UAE · 🇸🇦 KSA</span>
            </div>
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#132F3A] px-3.5 py-1.5 text-xs font-semibold text-[#B8C5C6] hover:border-[#2FB7B1] hover:text-white transition-all"
            >
              Dashboard
            </Link>
            <Link
              to="/assessment"
              className="flex items-center gap-1.5 rounded-lg bg-[#2FB7B1] px-3.5 py-1.5 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md"
            >
              <ClipboardList className="h-3.5 w-3.5" /> Assessment Reports
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl w-full flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.15)] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2FB7B1]">
              <Sparkles className="h-4 w-4" /> Comprehensive Longevity Check
            </div>
            <h1
              className="mt-1 text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              All-In-One Health & Longevity Questionnaire
            </h1>
            <p className="mt-1.5 text-sm text-[#B8C5C6]">
              Complete your metabolic, GLP-1 protocol, nutrition, and biomarker evaluation directly on one page without clicking through separate steps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setFormData(defaultState)}
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#132F3A] px-4 py-2 text-xs font-semibold text-[#B8C5C6] hover:border-[#2FB7B1] hover:text-white transition-all"
            >
              Load Sample Profile
            </button>
            <button
              onClick={resetForm}
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(199,112,102,0.3)] bg-[#132F3A] px-3.5 py-2 text-xs font-semibold text-[#C77066] hover:bg-[#C77066]/10 transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </button>
            <Link
              to="/assessment"
              className="flex items-center gap-2 rounded-lg bg-[#2FB7B1] px-4 py-2 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md"
            >
              <ClipboardList className="h-4 w-4" /> View Assessment Reports
            </Link>
          </div>
        </div>

        {/* Live Score Floating Card */}
        <div className="sticky top-2 z-20 rounded-2xl border border-[rgba(47,183,177,0.3)] bg-[#132F3A]/95 p-5 shadow-2xl backdrop-blur-md transition-all">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative grid h-16 w-16 place-items-center rounded-full bg-[conic-gradient(#2FB7B1_var(--p),#0B1F2A_0)] shadow-inner"
                style={{ "--p": `${results.score}%` } as React.CSSProperties}
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#132F3A]">
                  <span className="text-xl font-bold text-[#2FB7B1]">{results.score}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B8C5C6]">
                    Real-Time Readiness Score
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      results.approved
                        ? "bg-[#2FB7B1]/20 text-[#2FB7B1] border border-[#2FB7B1]/40"
                        : "bg-[#C77066]/20 text-[#C77066] border border-[#C77066]/40"
                    }`}
                  >
                    {results.approved ? "Approved — Founder Access Ready" : "Conditional — Protocol Review"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Assigned Persona: <span className="text-[#C2A46D]">The {results.persona}</span>
                </h3>
              </div>
            </div>

            {/* Quick pillar bars */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 text-xs">
              {Object.entries(results.categoryScores).map(([name, cat]) => (
                <div key={name} className="rounded-lg bg-[#0B1F2A]/60 p-2 border border-[rgba(47,183,177,0.1)]">
                  <div className="text-[10px] text-[#B8C5C6] truncate">{name}</div>
                  <div className="flex items-baseline gap-1 mt-0.5 font-bold text-white">
                    <span style={{ color: cat.color }}>{cat.value}</span>
                    <span className="text-[10px] text-[#B8C5C6]">/ {cat.max}</span>
                  </div>
                  <div className="w-full bg-[#1E4D57] h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(cat.value / cat.max) * 100}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToProfile}
                className="flex items-center gap-2 rounded-lg bg-[#2FB7B1] px-4 py-2 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md shrink-0"
              >
                <CheckCircle2 className="h-4 w-4" /> Save to Profile
              </button>
            </div>
          </div>

          {showSavedToast && (
            <div className="mt-3 rounded-lg bg-[#2FB7B1]/20 border border-[#2FB7B1]/50 p-2 text-center text-xs font-bold text-[#2FB7B1] animate-pulse">
              Assessment answers and calculated longevity score saved to your profile!
            </div>
          )}
        </div>

        {/* ---------------- QUESTIONNAIRE SECTIONS ---------------- */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main 2-column form area */}
          <div className="space-y-8 lg:col-span-2">
            {/* Section 1: Lead & Demographics */}
            <div className="rounded-2xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-[#2FB7B1] border-b border-[rgba(47,183,177,0.1)] pb-4">
                <User className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  1. Member Profile & Demographics
                </h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="First Name"
                    className="mt-1 w-full rounded-lg border border-[rgba(47,183,177,0.2)] bg-[#0B1F2A] px-3.5 py-2.5 text-sm text-white focus:border-[#2FB7B1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Last Name"
                    className="mt-1 w-full rounded-lg border border-[rgba(47,183,177,0.2)] bg-[#0B1F2A] px-3.5 py-2.5 text-sm text-white focus:border-[#2FB7B1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="email@example.com"
                    className="mt-1 w-full rounded-lg border border-[rgba(47,183,177,0.2)] bg-[#0B1F2A] px-3.5 py-2.5 text-sm text-white focus:border-[#2FB7B1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">Country of Residence</label>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    {[
                      { val: "UAE", label: "🇦🇪 UAE" },
                      { val: "KSA", label: "🇸🇦 KSA" },
                      { val: "OTHER", label: "Other" },
                    ].map((c) => (
                      <button
                        key={c.val}
                        type="button"
                        onClick={() => updateField("country", c.val)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                          formData.country === c.val
                            ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                            : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/50"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Biological Sex */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">Biological Sex</label>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    {[
                      { val: "female", label: "Female" },
                      { val: "male", label: "Male" },
                      { val: "na", label: "Other / NA" },
                    ].map((s) => (
                      <button
                        key={s.val}
                        type="button"
                        onClick={() => updateField("sex", s.val)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                          formData.sex === s.val
                            ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                            : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/50"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age Range */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">Age Range</label>
                  <div className="mt-1 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                    {[
                      { val: "under18", label: "<18" },
                      { val: "18-29", label: "18–29" },
                      { val: "30-39", label: "30–39" },
                      { val: "40-49", label: "40–49" },
                      { val: "50-59", label: "50–59" },
                      { val: "60plus", label: "60+" },
                    ].map((a) => (
                      <button
                        key={a.val}
                        type="button"
                        onClick={() => updateField("ageRange", a.val)}
                        className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all ${
                          formData.ageRange === a.val
                            ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                            : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/50"
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                  {formData.ageRange === "under18" && (
                    <p className="mt-1 text-xs text-[#C77066]">
                      Our clinical protocols are formulated for adults 18+.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Gate & Medical Safety Screening */}
            <div className="rounded-2xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-[#C2A46D] border-b border-[rgba(47,183,177,0.1)] pb-4">
                <Shield className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  2. Safety Screen & Health Precautions
                </h2>
              </div>
              <p className="mt-2 text-xs text-[#B8C5C6]">
                Please select any conditions that currently apply, or leave unselected if none.
              </p>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {MEDICAL_FLAGS.map((flag) => {
                  const isChecked = formData.medicalFlags.includes(flag);
                  return (
                    <button
                      key={flag}
                      type="button"
                      onClick={() => toggleArrayItem("medicalFlags", flag)}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 text-left text-xs transition-all ${
                        isChecked
                          ? "bg-[#C77066]/15 border-[#C77066] text-white"
                          : "bg-[#0B1F2A] border-[rgba(47,183,177,0.15)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                      }`}
                    >
                      <div
                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${
                          isChecked ? "bg-[#C77066] border-[#C77066] text-white" : "border-[#B8C5C6]/40"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span>{flag}</span>
                    </button>
                  );
                })}
              </div>

              {formData.medicalFlags.length > 0 && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#C77066]/30 bg-[#C77066]/10 p-3.5 text-xs text-[#C77066]">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <span>
                    Medical flags noted. A personalized physician review is required prior to GLP-1 initiation.
                  </span>
                </div>
              )}
            </div>

            {/* Section 3: Body Metrics & Composition */}
            <div className="rounded-2xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-[#2FB7B1] border-b border-[rgba(47,183,177,0.1)] pb-4">
                <Scale className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  3. Body Metrics & Starting Point
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                {/* Height */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                    <span className="font-semibold text-white">Height</span>
                    <span className="text-base font-bold text-[#2FB7B1]">{formData.heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    step="1"
                    value={formData.heightCm}
                    onChange={(e) => updateField("heightCm", Number(e.target.value))}
                    className="mt-2 w-full accent-[#2FB7B1] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#B8C5C6]">
                    <span>140 cm</span>
                    <span>175 cm</span>
                    <span>210 cm</span>
                  </div>
                </div>

                {/* Current Weight */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                    <span className="font-semibold text-white">Current Weight</span>
                    <span className="text-base font-bold text-[#2FB7B1]">{formData.weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="180"
                    step="1"
                    value={formData.weightKg}
                    onChange={(e) => updateField("weightKg", Number(e.target.value))}
                    className="mt-2 w-full accent-[#2FB7B1] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#B8C5C6]">
                    <span>40 kg</span>
                    <span>110 kg</span>
                    <span>180 kg</span>
                  </div>
                </div>

                {/* Goal Weight */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                    <span className="font-semibold text-white">Target / Goal Weight</span>
                    <span className="text-base font-bold text-[#C2A46D]">{formData.goalWeightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="180"
                    step="1"
                    value={formData.goalWeightKg}
                    onChange={(e) => updateField("goalWeightKg", Number(e.target.value))}
                    className="mt-2 w-full accent-[#C2A46D] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#B8C5C6]">
                    <span>40 kg</span>
                    <span>110 kg</span>
                    <span>180 kg</span>
                  </div>
                </div>

                {/* Derived Metrics Preview */}
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#0B1F2A] p-4 sm:grid-cols-3 border border-[rgba(47,183,177,0.15)]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B8C5C6]">Calculated BMI</span>
                    <p className="text-lg font-bold text-white mt-0.5">{bmi} kg/m²</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B8C5C6]">Target Delta</span>
                    <p className="text-lg font-bold text-[#2FB7B1] mt-0.5">
                      {weightDelta > 0 ? `-${weightDelta} kg` : weightDelta < 0 ? `+${Math.abs(weightDelta)} kg` : "At Goal"}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8C5C6]">Composition Goal</span>
                    <p className="text-xs font-semibold text-[#C2A46D] mt-1">Lean Mass Protection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: GLP-1 Gate & Pathway Selection */}
            <div className="rounded-2xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-[#2FB7B1] border-b border-[rgba(47,183,177,0.1)] pb-4">
                <Activity className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  4. GLP-1 Qualification & Protocol Pathway
                </h2>
              </div>

              <div className="mt-5">
                <label className="text-xs font-medium text-[#B8C5C6]">
                  Are you currently taking or considering a GLP-1 medication?
                </label>
                <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                  {[
                    { val: "yes", label: "Yes, currently on a GLP-1" },
                    { val: "prescribed", label: "Prescribed, haven't started" },
                    { val: "considering", label: "Not yet, but considering" },
                    { val: "no", label: "No, not considering" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => updateField("glp1Status", opt.val)}
                      className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-xs font-semibold transition-all ${
                        formData.glp1Status === opt.val
                          ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                          : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-white hover:border-[#2FB7B1]/50"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full border grid place-items-center ${
                          formData.glp1Status === opt.val
                            ? "border-[#0B1F2A] bg-[#0B1F2A] text-white"
                            : "border-[#B8C5C6]/40"
                        }`}
                      >
                        {formData.glp1Status === opt.val && <div className="h-1.5 w-1.5 rounded-full bg-[#2FB7B1]" />}
                      </div>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Path A: GLP-1 Companion Protocol */}
              {(formData.path === "glp1" || formData.glp1Status === "yes" || formData.glp1Status === "prescribed") && (
                <div className="mt-6 rounded-xl border border-[rgba(47,183,177,0.2)] bg-[#1E4D57]/30 p-5 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2FB7B1]">
                    <Sparkles className="h-4 w-4" /> GLP-1 Active Optimization Profile
                  </div>

                  {/* G1 Duration */}
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">How long have you been taking GLP-1?</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { val: "lt3", label: "< 3 months" },
                        { val: "3to6", label: "3–6 months" },
                        { val: "6to12", label: "6–12 months" },
                        { val: "gt12", label: "> 12 months" },
                      ].map((d) => (
                        <button
                          key={d.val}
                          type="button"
                          onClick={() => updateField("g1Duration", d.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.g1Duration === d.val
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* G2 Medication */}
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Which GLP-1 medication?</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Ozempic", "Wegovy", "Mounjaro", "Zepbound", "Saxenda", "Rybelsus", "Other"].map((med) => {
                        const val = med.toLowerCase();
                        return (
                          <button
                            key={med}
                            type="button"
                            onClick={() => updateField("g2Med", val)}
                            className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                              formData.g2Med === val
                                ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                                : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                            }`}
                          >
                            {med}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* G3 Challenge */}
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Biggest challenge on GLP-1?</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {[
                        { val: "muscle", label: "Muscle loss" },
                        { val: "side_effects", label: "Side effects / Nausea" },
                        { val: "plateau", label: "Plateau" },
                        { val: "appetite", label: "Extreme appetite suppression" },
                        { val: "cost", label: "Cost / Shortages" },
                        { val: "none", label: "No issues / Optimal" },
                      ].map((c) => (
                        <button
                          key={c.val}
                          type="button"
                          onClick={() => updateField("g3Challenge", c.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.g3Challenge === c.val
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* G4 Lean Muscle Risk Awareness */}
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">
                      Aware GLP-1s can cause up to 25–40% lean muscle loss without targeted protein & resistance?
                    </label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        { val: "yes", label: "Yes, very aware" },
                        { val: "somewhat", label: "Somewhat aware" },
                        { val: "no", label: "No, not really" },
                      ].map((a) => (
                        <button
                          key={a.val}
                          type="button"
                          onClick={() => updateField("g4MuscleAware", a.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.g4MuscleAware === a.val
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional Path B: Longevity Path */}
              {!(formData.path === "glp1" || formData.glp1Status === "yes" || formData.glp1Status === "prescribed") && (
                <div className="mt-6 rounded-xl border border-[rgba(194,164,109,0.25)] bg-[#C2A46D]/10 p-5 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A46D]">
                    <Heart className="h-4 w-4" /> Longevity & Metabolic Foundation Path
                  </div>

                  {/* L1 Goal */}
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Primary health focus</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {[
                        { val: "weight", label: "Weight Loss" },
                        { val: "metabolic", label: "Metabolic Health" },
                        { val: "longevity", label: "Longevity" },
                        { val: "muscle", label: "Build Muscle" },
                        { val: "energy", label: "Daily Energy" },
                      ].map((g) => (
                        <button
                          key={g.val}
                          type="button"
                          onClick={() => updateField("l1Goal", g.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.l1Goal === g.val
                              ? "bg-[#C2A46D] border-[#C2A46D] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(194,164,109,0.3)] text-[#B8C5C6] hover:border-[#C2A46D]/60"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* L2 Duration */}
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">How long pursuing this goal?</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { val: "lt3", label: "< 3 months" },
                        { val: "3to12", label: "3–12 months" },
                        { val: "1to3y", label: "1–3 years" },
                        { val: "gt3y", label: "> 3 years" },
                      ].map((d) => (
                        <button
                          key={d.val}
                          type="button"
                          onClick={() => updateField("l2Duration", d.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.l2Duration === d.val
                              ? "bg-[#C2A46D] border-[#C2A46D] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(194,164,109,0.3)] text-[#B8C5C6] hover:border-[#C2A46D]/60"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* L3 Obstacle */}
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Biggest obstacle so far?</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {[
                        { val: "time", label: "Time" },
                        { val: "knowledge", label: "Knowledge" },
                        { val: "consistency", label: "Consistency" },
                        { val: "motivation", label: "Motivation" },
                        { val: "support", label: "Support" },
                      ].map((o) => (
                        <button
                          key={o.val}
                          type="button"
                          onClick={() => updateField("l3Obstacle", o.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.l3Obstacle === o.val
                              ? "bg-[#C2A46D] border-[#C2A46D] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(194,164,109,0.3)] text-[#B8C5C6] hover:border-[#C2A46D]/60"
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 5: Nutrition, Movement & Recovery */}
            <div className="rounded-2xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-[#2FB7B1] border-b border-[rgba(47,183,177,0.1)] pb-4">
                <Flame className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  5. Nutrition, Movement & Recovery
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                {/* S3 Nutrition Pattern */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">Current Eating Pattern</label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {[
                      { val: "poor", title: "Mostly Processed / Fast Food", desc: "Frequent takeouts, high sugar, low protein" },
                      { val: "fair", title: "Mixed Diet", desc: "Healthy intentions with frequent social dinners" },
                      { val: "good", title: "Mostly Whole Foods", desc: "Home-cooked meals, adequate daily protein" },
                      { val: "excellent", title: "Strictly Dialed-In", desc: "Tracked macronutrients, high bio-availability" },
                    ].map((n) => (
                      <button
                        key={n.val}
                        type="button"
                        onClick={() => updateField("s3Nutrition", n.val)}
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          formData.s3Nutrition === n.val
                            ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                            : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                        }`}
                      >
                        <p className={`text-xs font-bold ${formData.s3Nutrition === n.val ? "text-[#0B1F2A]" : "text-white"}`}>
                          {n.title}
                        </p>
                        <p className={`text-[11px] mt-0.5 ${formData.s3Nutrition === n.val ? "text-[#0B1F2A]/80" : "text-[#B8C5C6]"}`}>
                          {n.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* S4 Workouts per week */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                    <span className="font-semibold text-white">Workouts per week</span>
                    <span className="text-base font-bold text-[#2FB7B1]">{formData.s4Exercise} sessions</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="7"
                    step="1"
                    value={formData.s4Exercise}
                    onChange={(e) => updateField("s4Exercise", Number(e.target.value))}
                    className="mt-2 w-full accent-[#2FB7B1] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#B8C5C6]">
                    <span>0 (Sedentary)</span>
                    <span>3–4 (Recommended)</span>
                    <span>7 (Daily)</span>
                  </div>
                </div>

                {/* S5 Exercise Types */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">
                    Preferred Exercise Types (Multi-select)
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {EXERCISE_OPTIONS.map((ex) => {
                      const active = formData.s5ExerciseTypes.includes(ex);
                      return (
                        <button
                          key={ex}
                          type="button"
                          onClick={() => toggleArrayItem("s5ExerciseTypes", ex)}
                          className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            active
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {ex}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* S6 Sleep Quality & S7 Stress Level */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                      <span className="font-semibold text-white">Sleep Quality</span>
                      <span className="text-base font-bold text-[#C2A46D]">{formData.s6Sleep}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={formData.s6Sleep}
                      onChange={(e) => updateField("s6Sleep", Number(e.target.value))}
                      className="mt-2 w-full accent-[#C2A46D] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#B8C5C6]">
                      <span>Poor (1)</span>
                      <span>Restorative (10)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-[#B8C5C6]">
                      <span className="font-semibold text-white">Daily Stress Level</span>
                      <span className="text-base font-bold text-[#C77066]">{formData.s7Stress}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={formData.s7Stress}
                      onChange={(e) => updateField("s7Stress", Number(e.target.value))}
                      className="mt-2 w-full accent-[#C77066] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#B8C5C6]">
                      <span>Calm (1)</span>
                      <span>Elevated (10)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Diagnostics, Biomarkers & Wearables */}
            <div className="rounded-2xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-[#2FB7B1] border-b border-[rgba(47,183,177,0.1)] pb-4">
                <Dna className="h-5 w-5" />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  6. Health Diagnostics, Biomarkers & Wearables
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                {/* S8 Current Supplement Use */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">Current Supplement Use</label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { val: "none", label: "None" },
                      { val: "basic", label: "Basic (Multi/D/Omega)" },
                      { val: "targeted", label: "Targeted Protocol" },
                      { val: "comprehensive", label: "Comprehensive Stack" },
                    ].map((supp) => (
                      <button
                        key={supp.val}
                        type="button"
                        onClick={() => updateField("s8Supplements", supp.val)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                          formData.s8Supplements === supp.val
                            ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                            : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                        }`}
                      >
                        {supp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* S9 Conditions */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">
                    Existing Metabolic or Cardiovascular Conditions (Multi-select)
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {CONDITION_OPTIONS.map((c) => {
                      const active = formData.s9Conditions.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleArrayItem("s9Conditions", c)}
                          className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            active
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* S11 Blood work in last 12 months */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Blood panel in last 12 months?</label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        { val: "yes", label: "Yes, Full Panel" },
                        { val: "partial", label: "Partial" },
                        { val: "no", label: "No / Unsure" },
                      ].map((b) => (
                        <button
                          key={b.val}
                          type="button"
                          onClick={() => updateField("s11Bloodwork", b.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.s11Bloodwork === b.val
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Working with a physician?</label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        { val: "yes", label: "Yes, Regularly" },
                        { val: "occasionally", label: "Occasionally" },
                        { val: "no", label: "No" },
                      ].map((p) => (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() => updateField("s10Physician", p.val)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            formData.s10Physician === p.val
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* S12 Biomarkers Tested */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">
                    Biomarkers Previously Tested (Multi-select)
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BIOMARKER_OPTIONS.map((bio) => {
                      const active = formData.s12Biomarkers.includes(bio);
                      return (
                        <button
                          key={bio}
                          type="button"
                          onClick={() => toggleArrayItem("s12Biomarkers", bio)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                            active
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {bio}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* S13 Wearables Used */}
                <div>
                  <label className="text-xs font-medium text-[#B8C5C6]">
                    Connected Wearables & Biosensors (Multi-select)
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {WEARABLE_OPTIONS.map((wear) => {
                      const active = formData.s13Wearables.includes(wear);
                      return (
                        <button
                          key={wear}
                          type="button"
                          onClick={() => toggleArrayItem("s13Wearables", wear)}
                          className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            active
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {wear}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* S14 Motivation & S15 Support Preference */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Motivation Consistency</label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        { val: "consistent", label: "Mostly Consistent" },
                        { val: "phases", label: "Phases" },
                        { val: "struggling", label: "Struggling" },
                      ].map((m) => (
                        <button
                          key={m.val}
                          type="button"
                          onClick={() => updateField("s14Motivation", m.val)}
                          className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all ${
                            formData.s14Motivation === m.val
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#B8C5C6]">Preferred Support Model</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { val: "1on1", label: "1:1 Coach" },
                        { val: "community", label: "Community" },
                        { val: "ai", label: "AI-Guided" },
                        { val: "self", label: "Self-Directed" },
                      ].map((s) => (
                        <button
                          key={s.val}
                          type="button"
                          onClick={() => updateField("s15Support", s.val)}
                          className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all ${
                            formData.s15Support === s.val
                              ? "bg-[#2FB7B1] border-[#2FB7B1] text-[#0B1F2A]"
                              : "bg-[#0B1F2A] border-[rgba(47,183,177,0.2)] text-[#B8C5C6] hover:border-[#2FB7B1]/40"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Dynamic Scoring & Insights */}
          <div className="space-y-6">
            {/* Score Breakdown Summary Card */}
            <div className="rounded-2xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-b from-[#132F3A] to-[#0B1F2A] p-6 shadow-xl sticky top-28">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Diagnostic Output
              </h3>
              <p className="mt-1 text-xs text-[#B8C5C6]">
                Evaluated against clinical guidelines for metabolic resilience and lean mass retention.
              </p>

              <div className="my-6 flex justify-center">
                <div className="relative grid h-40 w-40 place-items-center">
                  <svg width="160" height="160" className="-rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="#1E4D57"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="#2FB7B1"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 65}
                      strokeDashoffset={2 * Math.PI * 65 * (1 - results.score / 100)}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {results.score}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#B8C5C6]">out of 100</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#0B1F2A] p-4 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#B8C5C6]">Assigned Clinical Persona</span>
                <p className="mt-1 text-base font-bold text-[#C2A46D]">The {results.persona}</p>
                <p className="mt-1 text-xs text-[#B8C5C6]">
                  {results.approved
                    ? "Qualified for immediate bespoke biomarker protocol and founder physician access."
                    : "Conditional access. Baseline nutritional stabilization recommended before starting."}
                </p>
              </div>

              {/* Dimension Breakdown */}
              <div className="mt-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Dimension Scores</span>
                {Object.entries(results.categoryScores).map(([name, cat]) => (
                  <div key={name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#B8C5C6]">{name}</span>
                      <span className="font-bold text-white">
                        {cat.value} <span className="text-[#B8C5C6] font-normal">/ {cat.max}</span>
                      </span>
                    </div>
                    <div className="w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${(cat.value / cat.max) * 100}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  onClick={handleSaveToProfile}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2FB7B1] py-3 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md"
                >
                  <CheckCircle2 className="h-4 w-4" /> Save Evaluation & Sync
                </button>
                <Link
                  to="/biomarkers"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[rgba(47,183,177,0.3)] bg-[#132F3A] py-2.5 text-xs font-semibold text-white hover:border-[#2FB7B1] transition-all"
                >
                  View Targeted Biomarkers <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Standalone Independent Footer */}
      <footer className="mt-16 border-t border-[rgba(47,183,177,0.15)] bg-[#0B1F2A] py-8 text-xs text-[#B8C5C6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">e6health Precision Longevity Protocol</p>
            <p className="text-[11px] text-[#B8C5C6] mt-0.5">
              Clinical metabolic optimization, GLP-1 companion care & continuous biomarker intelligence.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link to="/" className="hover:text-white transition-colors">Patient Dashboard</Link>
            <Link to="/biomarkers" className="hover:text-white transition-colors">Biomarkers</Link>
            <Link to="/protocol" className="hover:text-white transition-colors">Protocol</Link>
            <Link to="/assessment" className="hover:text-white transition-colors">Assessment Reports</Link>
            <span className="text-[#2FB7B1]">Confidential Clinical Intake</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
