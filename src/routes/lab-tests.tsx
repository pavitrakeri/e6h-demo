import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  FlaskConical,
  Dna,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/lab-tests")({
  head: () => ({
    meta: [
      { title: "Get Lab Tests — e6health" },
      { name: "description", content: "Certified clinical bloodwork and DNA panels with home collection service in UAE." },
    ],
  }),
  component: LabTestsPage,
});

interface LabTest {
  id: number;
  name: string;
  provider: string;
  price: number;
  currency: string;
  description: string;
  tests: string;
  homeService: boolean;
  category: "all" | "dna" | "metabolic" | "gut" | "hormones";
  badge?: string;
  color: string;
}

const labTests: LabTest[] = [
  {
    id: 1,
    name: "Fitness DNA Check",
    provider: "LAB PARTNER CLINICAL",
    price: 800,
    currency: "AED",
    description: "Genetic fitness profile, muscular fiber composition, and personalized endurance response.",
    tests: "DNA Analysis",
    homeService: true,
    category: "dna",
    badge: "Genomic",
    color: "#2FB7B1",
  },
  {
    id: 2,
    name: "Fitness DNA Check Athletes",
    provider: "LAB PARTNER CLINICAL",
    price: 900,
    currency: "AED",
    description: "Advanced genetic analysis for athletic power output, lactate clearance, and injury resilience.",
    tests: "DNA + Performance Epigenetics",
    homeService: true,
    category: "dna",
    badge: "Athletic",
    color: "#C77066",
  },
  {
    id: 3,
    name: "Food Sensitivity & Intolerance",
    provider: "LAB PARTNER CLINICAL",
    price: 950,
    currency: "AED",
    description: "Comprehensive IgG antibody screening against 200+ foods to eliminate hidden inflammation.",
    tests: "200+ Food Antigens",
    homeService: true,
    category: "gut",
    badge: "Anti-Inflammatory",
    color: "#C2A46D",
  },
  {
    id: 4,
    name: "Cortisol & Adrenal Rhythm Test",
    provider: "LAB PARTNER CLINICAL",
    price: 1100,
    currency: "AED",
    description: "Stress hormone levels and 4-point circadian diurnal saliva test to balance exhaustion.",
    tests: "4-Point Diurnal Panel",
    homeService: true,
    category: "hormones",
    badge: "Stress & Sleep",
    color: "#259E99",
  },
  {
    id: 5,
    name: "Gut Health Microbiome Panel",
    provider: "LAB PARTNER CLINICAL",
    price: 1600,
    currency: "AED",
    description: "Deep metagenomic sequencing of 50+ microbial species, intestinal permeability, and butyrate.",
    tests: "50+ Microbial Markers",
    homeService: true,
    category: "gut",
    badge: "Microbiome",
    color: "#DE3C30",
  },
  {
    id: 6,
    name: "Functional Longevity Panel",
    provider: "LAB PARTNER CLINICAL",
    price: 2750,
    currency: "AED",
    description: "Complete functional medicine suite with 100+ biomarkers including ApoB, Lp(a), and NAD+.",
    tests: "100+ Advanced Biomarkers",
    homeService: true,
    category: "metabolic",
    badge: "Comprehensive",
    color: "#2FB7B1",
  },
  {
    id: 7,
    name: "Life Platinum Package",
    provider: "Lifepharmacy Labs",
    price: 135,
    currency: "AED",
    description: "Baseline essential health checkup covering CBC, renal, liver enzymes, and lipid panels.",
    tests: "63 Standard Tests",
    homeService: true,
    category: "metabolic",
    badge: "Popular Value",
    color: "#259E99",
  },
  {
    id: 8,
    name: "GLP-1 Metabolic Optimization Panel",
    provider: "Quest / e6health Partner",
    price: 490,
    currency: "AED",
    description: "Tailored for GLP-1 patients: Fasting Insulin, HbA1c, hs-CRP, Lipid subfractions, and Electrolytes.",
    tests: "18 Metabolic Markers",
    homeService: true,
    category: "metabolic",
    badge: "GLP-1 Specialized",
    color: "#2FB7B1",
  },
];

function LabTestsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [bookingTest, setBookingTest] = useState<LabTest | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [homeAddress, setHomeAddress] = useState("Downtown Dubai, Boulevard Crescent Tower 1");
  const [bookingDate, setBookingDate] = useState("2026-05-15");

  const filteredTests =
    selectedFilter === "all"
      ? labTests
      : labTests.filter((t) => t.category === selectedFilter);

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingTest(null);
    }, 2200);
  };

  return (
    <DashboardLayout title="Get Lab Tests">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Top Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-r from-[#1E4D57] via-[#132F3A] to-[#0B1F2A] p-5 sm:p-8 shadow-xl">
          <div className="max-w-2xl space-y-2.5 sm:space-y-3">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2FB7B1]">
              <ShieldCheck className="h-4 w-4" /> Certified Clinical Phlebotomy Service
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Certified Home Blood Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#B8C5C6] leading-relaxed">
              A certified DHA/MOH licensed nurse visits your home or office anywhere across Dubai, Abu Dhabi,
              and Sharjah. Fasting blood draws completed in 15 minutes with digital results returned in 24–48 hours.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2 text-[11px] sm:text-xs text-[#2FB7B1]">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 7:00 AM – 11:00 AM Fasting Slots
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> UAE & KSA Coverage
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar (Scrollable on mobile) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
            {[
              { id: "all", label: "All Tests & Panels" },
              { id: "metabolic", label: "Metabolic & GLP-1" },
              { id: "dna", label: "Genomic DNA" },
              { id: "gut", label: "Gut & Sensitivity" },
              { id: "hormones", label: "Hormone & Stress" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`rounded-lg px-3.5 sm:px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? "bg-[#2FB7B1] text-[#0B1F2A] shadow-md shadow-[#2FB7B1]/20"
                    : "bg-[#132F3A] text-[#B8C5C6] border border-[rgba(47,183,177,0.15)] hover:border-[#2FB7B1]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#B8C5C6] shrink-0">{filteredTests.length} tests available</span>
        </div>

        {/* Test Cards Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="flex flex-col justify-between rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl transition-all hover:border-[#2FB7B1]/40"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2FB7B1]">
                    {test.provider}
                  </span>
                  {test.badge && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                      style={{ backgroundColor: `${test.color}20`, color: test.color }}
                    >
                      {test.badge}
                    </span>
                  )}
                </div>

                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {test.name}
                </h3>
                <p className="text-xs text-[#B8C5C6] leading-relaxed mb-4">{test.description}</p>

                <div className="rounded-lg bg-[#1E4D57]/40 p-3 border border-[rgba(47,183,177,0.1)] mb-4">
                  <span className="text-[10px] text-[#B8C5C6] block">Panel Details</span>
                  <span className="text-xs font-semibold text-white">{test.tests}</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-[rgba(47,183,177,0.1)]">
                  <div>
                    <span className="text-[10px] text-[#B8C5C6]">Home Service Included</span>
                    <p className="text-2xl font-bold text-white">
                      {test.price} <span className="text-xs font-semibold text-[#2FB7B1]">{test.currency}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-[#2FB7B1] font-medium">✓ Results in 24-48h</span>
                </div>

                <button
                  onClick={() => setBookingTest(test)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] py-3 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md"
                >
                  Book Home Collection <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Footnote */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 text-xs text-[#B8C5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-semibold text-white">DHA & CAP Certified Laboratory Network</p>
            <p>Every phlebotomist is licensed, certified, and operates in adherence to strict sterile protocol.</p>
          </div>
          <span className="text-[#2FB7B1] font-semibold whitespace-nowrap">
            Support Line: +971 4 800-E6HEALTH
          </span>
        </div>
      </div>

      {/* Booking Dialog Modal */}
      {bookingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(47,183,177,0.3)] bg-[#132F3A] p-4 sm:p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[rgba(47,183,177,0.15)] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#2FB7B1] uppercase">Home Blood Collection</span>
                <h3 className="text-base sm:text-lg font-bold text-white">{bookingTest.name}</h3>
              </div>
              <span className="text-base sm:text-lg font-bold text-[#C2A46D]">{bookingTest.price} AED</span>
            </div>

            {bookingConfirmed ? (
              <div className="py-6 sm:py-8 text-center text-[#2FB7B1]">
                <CheckCircle2 className="mx-auto h-10 w-10 sm:h-12 sm:w-12 mb-3" />
                <h4 className="text-base sm:text-lg font-bold text-white">Appointment Confirmed!</h4>
                <p className="text-xs text-[#B8C5C6] mt-1">
                  Nurse booked for {bookingDate} at 8:00 AM. Fasting instructions sent via SMS.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-white block mb-1">Patient Name</label>
                  <input
                    type="text"
                    defaultValue="Sarah Johnson"
                    className="w-full rounded-lg bg-[#1E4D57] p-2.5 text-white border border-[rgba(47,183,177,0.2)]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">Collection Address (UAE)</label>
                  <input
                    type="text"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    className="w-full rounded-lg bg-[#1E4D57] p-2.5 text-white border border-[rgba(47,183,177,0.2)]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-white block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full rounded-lg bg-[#1E4D57] p-2.5 text-white border border-[rgba(47,183,177,0.2)]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-white block mb-1">Fasting Time Slot</label>
                    <select className="w-full rounded-lg bg-[#1E4D57] p-2.5 text-white border border-[rgba(47,183,177,0.2)]">
                      <option>7:30 AM – 8:30 AM (Fasting)</option>
                      <option>8:30 AM – 9:30 AM (Fasting)</option>
                      <option>9:30 AM – 10:30 AM (Fasting)</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg bg-[#0B1F2A]/60 p-3 text-[11px] text-[#B8C5C6]">
                  ℹ️ Fasting requirement: 10–12 hours prior to draw. Plain water is permitted.
                </div>

                <div className="flex gap-2 justify-end pt-3">
                  <button
                    onClick={() => setBookingTest(null)}
                    className="rounded-lg border border-[rgba(47,183,177,0.3)] px-4 py-2 font-semibold text-white hover:bg-[#1E4D57]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="rounded-lg bg-[#2FB7B1] px-5 py-2 font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white"
                  >
                    Confirm Appointment
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
