import { ArrowRight, Clock, Utensils, Zap } from "lucide-react";

interface BusyDayWidgetProps {
  mealTitle?: string;
  mealDescription?: string;
}

export function BusyDayWidget({
  mealTitle = "Your bio-aligned meal is ready",
  mealDescription = "Smart recommendations based on your metabolic biomarkers and GLP-1 adherence.",
}: BusyDayWidgetProps) {
  const handleTalabat = () => {
    window.open("https://talabat.com/", "_blank");
  };

  const handleNoon = () => {
    window.open("https://www.noon.com/", "_blank");
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-r from-[#1E4D57] via-[#132F3A] to-[#0B1F2A] shadow-xl">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=400&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative flex flex-col justify-between gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A46D]">
            <Utensils className="h-4 w-4" />
            <span>Smart Delivery</span>
          </div>
          <h3
            className="text-2xl font-bold text-white md:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Busy day?
          </h3>
          <p className="text-sm font-medium text-white">{mealTitle}</p>
          <p className="text-xs text-[#B8C5C6] leading-relaxed">{mealDescription}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleTalabat}
              className="flex items-center gap-2 rounded-lg bg-[#FF6B35] px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#E55A2B]"
            >
              Order from Talabat <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleNoon}
              className="flex items-center gap-2 rounded-lg bg-[#FFD700] px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-lg transition-transform hover:scale-105 hover:bg-[#FFC700]"
            >
              Order from Noon <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[rgba(47,183,177,0.15)] text-xs text-[#B8C5C6]">
            <span className="flex items-center gap-1.5 text-[#2FB7B1] font-medium">
              <Clock className="h-3.5 w-3.5" /> 30-45 min delivery
            </span>
            <span>•</span>
            <span>Free delivery on orders over AED 50</span>
          </div>
        </div>

        <div className="hidden lg:block w-72 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=350&fit=crop"
            alt="Bio-aligned meal"
            className="h-48 w-full rounded-xl object-cover shadow-2xl border border-[rgba(47,183,177,0.2)]"
          />
        </div>
      </div>
    </div>
  );
}
