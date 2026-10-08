import { useState } from "react";
import { HeartPulse, Check, Sparkles } from "lucide-react";

interface Symptom {
  id: string;
  symptom: string;
  icon: string;
  color: string;
}

const symptomList: Symptom[] = [
  { id: "hunger", symptom: "Hunger Level", icon: "🍽️", color: "#2FB7B1" },
  { id: "nausea", symptom: "Nausea", icon: "😵", color: "#C77066" },
  { id: "headache", symptom: "Headache", icon: "🤕", color: "#DE3C30" },
  { id: "fatigue", symptom: "Fatigue", icon: "😴", color: "#259E99" },
  { id: "diarrhea", symptom: "Diarrhea", icon: "⚠️", color: "#C77066" },
  { id: "constipation", symptom: "Constipation", icon: "⚠️", color: "#C77066" },
  { id: "bloating", symptom: "Bloating", icon: "💨", color: "#259E99" },
  { id: "energy", symptom: "Energy Level", icon: "⚡", color: "#C2A46D" },
];

const wellnessMetrics = [
  { label: "Overall Wellbeing", icon: "😊", defaultValue: 8 },
  { label: "Mood", icon: "🧠", defaultValue: 8 },
  { label: "Sleep Quality", icon: "😴", defaultValue: 7 },
  { label: "Appetite Control", icon: "🍽️", defaultValue: 8 },
];

export function DailySymptomTracker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({
    "Overall Wellbeing": 8,
    Mood: 8,
    "Sleep Quality": 7,
    "Appetite Control": 8,
  });
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRatingChange = (label: string, value: number) => {
    setRatings((prev) => ({ ...prev, [label]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl md:p-8">
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <div>
          <h3
            className="text-lg sm:text-xl md:text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Daily Wellness Check-In
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
            How are you feeling today? Your response helps optimize your protocol.
          </p>
        </div>
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(222,60,48,0.15)] text-[#DE3C30]">
          <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>

      {/* Symptoms Grid */}
      <div className="mb-6 sm:mb-8">
        <p className="mb-2.5 sm:mb-3 text-xs sm:text-sm font-semibold text-white">Any symptoms today?</p>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
          {symptomList.map((item) => {
            const active = selectedSymptoms.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleSymptom(item.id)}
                className={`flex flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-xl border p-3 sm:p-4 text-center transition-all ${
                  active
                    ? "border-[#2FB7B1] bg-[#1E4D57] shadow-md shadow-[#2FB7B1]/10 text-white"
                    : "border-[rgba(47,183,177,0.15)] bg-[#1E4D57]/40 text-[#B8C5C6] hover:border-[#2FB7B1]/50"
                }`}
              >
                <span className="text-xl sm:text-2xl">{item.icon}</span>
                <span className="text-[11px] sm:text-xs font-semibold">{item.symptom}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wellness Sliders */}
      <div className="mb-6 sm:mb-8">
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-white">Rate your wellness (1-10)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          {wellnessMetrics.map((item) => (
            <div key={item.label} className="rounded-lg bg-[#0B1F2A]/40 p-4 border border-[rgba(47,183,177,0.1)]">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-[#B8C5C6]">
                  <span>{item.icon}</span>
                  {item.label}
                </span>
                <span className="font-bold text-[#2FB7B1] text-sm">
                  {ratings[item.label] || item.defaultValue}/10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={ratings[item.label] || item.defaultValue}
                onChange={(e) => handleRatingChange(item.label, parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#1E4D57] accent-[#2FB7B1]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Insight & Note */}
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-lg border border-[rgba(47,183,177,0.2)] bg-[#1E4D57]/40 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-[#2FB7B1]" /> Today's Protocol Insight
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#B8C5C6]">
            {selectedSymptoms.length === 0
              ? "Great! No symptoms reported today. Your GLP-1 optimization is currently at peak metabolic efficiency."
              : `Noted: ${selectedSymptoms.join(", ")}. Protocol hydration and digestive enzyme timing have been adjusted accordingly.`}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-white">
            Additional observations (optional)
          </label>
          <textarea
            placeholder="Any additional observations about energy, digestion, or protocol adherence..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-[rgba(47,183,177,0.15)] bg-[#1E4D57]/40 p-3 text-xs text-white placeholder-[#5E8A8A] focus:border-[#2FB7B1] focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-bold transition-all shadow-lg ${
            saved
              ? "bg-[#259E99] text-white"
              : "bg-[#2FB7B1] text-[#0B1F2A] hover:bg-[#259E99] hover:text-white"
          }`}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Check-In Saved
            </>
          ) : (
            "Save Check-In"
          )}
        </button>
      </div>
    </div>
  );
}
