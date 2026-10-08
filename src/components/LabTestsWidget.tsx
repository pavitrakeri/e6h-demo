import { Link } from "@tanstack/react-router";
import { FlaskConical, ArrowRight, ShieldCheck } from "lucide-react";

const testHighlights = [
  { name: "Fitness DNA Check", price: 800, provider: "LAB PARTNER" },
  { name: "Life Platinum Package", price: 135, provider: "Lifepharmacy", tests: "63 tests" },
  { name: "Gut Health Microbiome", price: 1600, provider: "LAB PARTNER" },
];

export function LabTestsWidget() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.15)] bg-gradient-to-br from-[#1E4D57] to-[#132F3A] p-6 shadow-xl">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2FB7B1] text-[#0B1F2A] shadow-md">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Lab Tests Available
              </h3>
              <p className="text-xs text-[#B8C5C6]">Home collection service · UAE/KSA</p>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[rgba(47,183,177,0.2)] px-2.5 py-1 text-[10px] font-bold text-[#2FB7B1]">
            <ShieldCheck className="h-3 w-3" /> Certified
          </span>
        </div>

        <div className="mb-5 space-y-2.5">
          {testHighlights.map((test) => (
            <div
              key={test.name}
              className="flex items-center justify-between rounded-lg bg-[#0B1F2A]/50 p-3 border border-[rgba(47,183,177,0.1)] transition-colors hover:border-[#2FB7B1]/40"
            >
              <div className="min-w-0 flex-1 pr-3">
                <p className="truncate text-sm font-semibold text-white">{test.name}</p>
                <p className="text-[11px] text-[#B8C5C6]">{test.provider}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#C2A46D]">{test.price} AED</span>
                {test.tests && <p className="text-[10px] text-[#B8C5C6]">{test.tests}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Link
          to="/lab-tests"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] py-3 text-xs font-bold text-[#0B1F2A] shadow-md transition-all hover:bg-[#259E99] hover:text-white"
        >
          Explore All Tests <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-center text-[10px] text-[#B8C5C6]">
          ✓ Results in 24–48 hours · Certified lab partners
        </p>
      </div>
    </div>
  );
}
