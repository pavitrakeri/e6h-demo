import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Flame,
  Activity,
  Dumbbell,
  Timer,
  TrendingUp,
  Footprints,
  HeartPulse,
  CheckCircle2,
  Play,
  Award,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/movement")({
  head: () => ({
    meta: [
      { title: "My Movement — e6health" },
      { name: "description", content: "Track daily steps, zone 2 cardio, and resistance training for GLP-1 muscle preservation." },
    ],
  }),
  component: MovementPage,
});

const weeklySteps = [
  { day: "Mon", steps: 7200, activeCalories: 580 },
  { day: "Tue", steps: 8100, activeCalories: 640 },
  { day: "Wed", steps: 6500, activeCalories: 490 },
  { day: "Thu", steps: 7800, activeCalories: 610 },
  { day: "Fri", steps: 8500, activeCalories: 680 },
  { day: "Sat", steps: 9200, activeCalories: 740 },
  { day: "Sun", steps: 6234, activeCalories: 520 },
];

const workoutsToday = [
  {
    title: "Postprandial Glucose Walk",
    timing: "1:00 PM (30 min after lunch)",
    duration: "20 mins",
    intensity: "Zone 1-2 Aerobic",
    benefit: "Attenuates blood glucose spike by 30-40% via non-insulin mediated GLUT4 translocation.",
    completed: true,
  },
  {
    title: "Hypertrophy Upper Body & Core",
    timing: "5:30 PM",
    duration: "45 mins",
    intensity: "Zone 3 Resistance Training",
    benefit: "Spares lean skeletal mass and sustains metabolic rate during GLP-1 caloric deficit.",
    completed: false,
  },
  {
    title: "Evening Mobility & Parasympathetic Decompression",
    timing: "9:00 PM",
    duration: "15 mins",
    intensity: "Restorative Stretching",
    benefit: "Lowers bedtime cortisol and primes autonomic system for deep stage 3 slow-wave sleep.",
    completed: false,
  },
];

function MovementPage() {
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([0]);

  const toggleWorkout = (index: number) => {
    setCompletedWorkouts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <DashboardLayout title="My Movement">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.12)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2FB7B1] mb-1">
              <span>🏃</span> Movement & Lean Mass Preservation
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Movement
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Targeted physical stimulus to preserve skeletal muscle and enhance insulin sensitivity on GLP-1.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/wearables"
              className="rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 py-2 text-xs font-bold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all"
            >
              Apple Watch Synced
            </Link>
          </div>
        </div>

        {/* 4 Movement Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Daily Steps</span>
              <Footprints className="h-4 w-4 text-[#2FB7B1] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">6,234</p>
            <div className="mt-2.5 sm:mt-3 w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
              <div className="bg-[#2FB7B1] h-full" style={{ width: "78%" }} />
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#B8C5C6] mt-1.5 sm:mt-2">Goal: 8,000 steps</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Active Energy</span>
              <Flame className="h-4 w-4 text-[#DE3C30] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#DE3C30]">520 kcal</p>
            <div className="mt-2.5 sm:mt-3 w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
              <div className="bg-[#DE3C30] h-full" style={{ width: "86%" }} />
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#B8C5C6] mt-1.5 sm:mt-2">Goal: 600 kcal active</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Zone 2 Cardio</span>
              <Timer className="h-4 w-4 text-[#C2A46D] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#C2A46D]">35 min</p>
            <div className="mt-2.5 sm:mt-3 w-full bg-[#1E4D57] h-2 rounded-full overflow-hidden">
              <div className="bg-[#C2A46D] h-full" style={{ width: "70%" }} />
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#B8C5C6] mt-1.5 sm:mt-2">Lipid oxidation zone</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Est. VO2 Max</span>
              <HeartPulse className="h-4 w-4 text-[#259E99] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#2FB7B1]">41.5</p>
            <p className="text-[10px] sm:text-[11px] text-[#2FB7B1] font-semibold mt-2.5 sm:mt-3">✓ Top 20% longevity</p>
            <p className="text-[10px] text-[#B8C5C6] mt-0.5">Cardiorespiratory fitness</p>
          </div>
        </div>

        {/* 7-Day Step Progression */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Weekly Movement Consistency
              </h3>
              <p className="text-xs text-[#B8C5C6]">Steady low-intensity movement sustains steady GLP-1 glycemic control</p>
            </div>
            <span className="text-xs font-semibold text-[#2FB7B1]">Average: 7,647 steps / day</span>
          </div>
          <div className="h-56 sm:h-72 w-full min-w-0 overflow-hidden pt-2 sm:pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySteps} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(47,183,177,0.1)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#B8C5C6" fontSize={11} tickLine={false} />
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
                <Bar dataKey="steps" fill="#2FB7B1" radius={[4, 4, 0, 0]} name="Daily Steps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Prescribed Movement Protocol */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Prescribed Movement Schedule
              </h3>
              <p className="text-xs text-[#B8C5C6]">Tailored to today's recovery score of 78 and carbohydrate intake</p>
            </div>
            <span className="text-xs font-semibold text-[#2FB7B1]">
              {completedWorkouts.length} of {workoutsToday.length} Completed
            </span>
          </div>

          <div className="space-y-4">
            {workoutsToday.map((workout, index) => {
              const isDone = completedWorkouts.includes(index);
              return (
                <div
                  key={workout.title}
                  className={`flex flex-col justify-between gap-4 rounded-xl border p-5 transition-all md:flex-row md:items-center ${
                    isDone
                      ? "border-[#2FB7B1]/40 bg-[#1E4D57]/40 shadow-sm"
                      : "border-[rgba(47,183,177,0.12)] bg-[#0B1F2A]/40 hover:border-[#2FB7B1]/30"
                  }`}
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-bold text-white">{workout.title}</span>
                      <span className="rounded-full bg-[#2FB7B1]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#2FB7B1]">
                        {workout.duration}
                      </span>
                      <span className="rounded-full bg-[#C2A46D]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#C2A46D]">
                        {workout.intensity}
                      </span>
                    </div>
                    <p className="text-xs text-[#2FB7B1] font-medium">{workout.timing}</p>
                    <p className="text-xs text-[#B8C5C6] leading-relaxed">{workout.benefit}</p>
                  </div>

                  <button
                    onClick={() => toggleWorkout(index)}
                    className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition-all shadow-md shrink-0 ${
                      isDone
                        ? "bg-[#2FB7B1] text-[#0B1F2A]"
                        : "border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A]"
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
