import { Link } from "@tanstack/react-router";
import { Pill, Package, ArrowRight } from "lucide-react";

const supplementList = [
  { name: "Berberine", dosage: "500mg" },
  { name: "Omega-3", dosage: "2000mg" },
  { name: "Magnesium", dosage: "300mg" },
  { name: "Chromium", dosage: "200mcg" },
];

export function SupplementsStackWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-gradient-to-br from-[#2FB7B1] to-[#1E4D57] p-6 text-white shadow-xl flex flex-col justify-between">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F2A] text-[#2FB7B1] shadow-md">
              <Pill className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Supplement Stack
              </h3>
              <p className="text-xs text-[#0B1F2A]/80 font-medium">4 active bio-aligned supplements</p>
            </div>
          </div>
          <Package className="h-5 w-5 text-[#0B1F2A]" />
        </div>

        <div className="mb-5 space-y-2">
          {supplementList.map((sup) => (
            <div
              key={sup.name}
              className="flex items-center justify-between rounded-lg bg-[#0B1F2A]/30 px-3.5 py-2.5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0B1F2A]" />
                <span className="text-xs font-semibold text-white">{sup.name}</span>
              </div>
              <span className="text-xs font-bold text-[#0B1F2A]">{sup.dosage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Link
          to="/marketplace"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F2A] py-3 text-xs font-bold text-[#2FB7B1] shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#132F3A]"
        >
          Discover Your Daily Stack <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-center text-[10px] text-white/80 font-medium">
          ✓ Free shipping across UAE on orders over AED 100
        </p>
      </div>
    </div>
  );
}
