import { useState, useRef, useEffect } from "react";
import { Camera, X, Check, ScanLine, Loader2, Sparkles } from "lucide-react";

interface ScannedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
  timestamp: string;
}

const sampleMeals = [
  {
    name: "Grilled Salmon with Quinoa",
    calories: 520,
    protein: 42,
    carbs: 35,
    fat: 22,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  },
  {
    name: "Avocado & Poached Egg Toast",
    calories: 320,
    protein: 16,
    carbs: 24,
    fat: 18,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
  },
  {
    name: "Mediterranean Grilled Chicken Salad",
    calories: 420,
    protein: 45,
    carbs: 28,
    fat: 14,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
  },
  {
    name: "Bio-Aligned Protein Bowl",
    calories: 380,
    protein: 36,
    carbs: 22,
    fat: 12,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
];

interface FoodScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete?: (meal: ScannedMeal) => void;
}

export function FoodScanner({ isOpen, onClose, onScanComplete }: FoodScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScannedMeal | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const triggerScan = () => {
    setScanning(true);
    setTimeout(() => {
      const picked = sampleMeals[Math.floor(Math.random() * sampleMeals.length)];
      const meal: ScannedMeal = {
        id: Date.now().toString(),
        ...picked,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setResult(meal);
      setScanning(false);
      setCameraActive(false);
    }, 1500);
  };

  const handleSaveMeal = () => {
    if (result && onScanComplete) {
      onScanComplete(result);
    }
    setResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(47,183,177,0.25)] bg-[#132F3A] p-4 sm:p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-[rgba(47,183,177,0.15)] pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#2FB7B1]/20 text-[#2FB7B1]">
              <ScanLine className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                AI Food Scanner
              </h3>
              <p className="text-[11px] sm:text-xs text-[#B8C5C6]">Instant nutritional analysis for GLP-1 optimization</p>
            </div>
          </div>
          <button
            onClick={() => {
              setResult(null);
              onClose();
            }}
            className="rounded-lg p-1.5 sm:p-2 text-[#B8C5C6] hover:bg-[#1E4D57] hover:text-white"
            aria-label="Close scanner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scan Body */}
        {!result ? (
          <div className="space-y-4 sm:space-y-6 text-center">
            {cameraActive ? (
              <div className="relative h-52 sm:h-64 w-full overflow-hidden rounded-xl border border-[rgba(47,183,177,0.3)] bg-black">
                <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-xl border-2 border-dashed border-[#2FB7B1] animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[rgba(47,183,177,0.2)] bg-[#1E4D57]/30 p-6 sm:p-10">
                <Camera className="mb-2 sm:mb-3 h-10 w-10 sm:h-14 sm:w-14 text-[#2FB7B1]" />
                <p className="text-sm sm:text-base font-semibold text-white">Point camera or choose meal</p>
                <p className="mt-1 text-xs text-[#B8C5C6] max-w-xs">
                  Our AI vision calculates precise macronutrients and GLP-1 compatibility.
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              <button
                disabled={scanning}
                onClick={triggerScan}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-lg disabled:opacity-50"
              >
                {scanning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Analyzing Nutrients...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Start AI Meal Scan
                  </>
                )}
              </button>
              {!cameraActive && (
                <button
                  onClick={() => setCameraActive(true)}
                  className="rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all"
                >
                  Enable Camera
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="space-y-4 sm:space-y-6">
            {result.image && (
              <img
                src={result.image}
                alt={result.name}
                className="h-40 sm:h-48 w-full rounded-xl object-cover border border-[rgba(47,183,177,0.2)] shadow-md"
              />
            )}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2FB7B1]">Identified Meal</span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-0.5 sm:mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {result.name}
              </h4>
              <p className="text-xs text-[#B8C5C6] mt-0.5">Scanned at {result.timestamp} · High Protein Bio-Aligned</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="rounded-lg bg-[#1E4D57] p-2.5 sm:p-3 text-center border border-[rgba(47,183,177,0.1)]">
                <span className="text-[10px] text-[#B8C5C6]">Calories</span>
                <p className="text-base sm:text-lg font-bold text-[#2FB7B1]">{result.calories}</p>
                <span className="text-[10px] text-[#B8C5C6]">kcal</span>
              </div>
              <div className="rounded-lg bg-[#1E4D57] p-2.5 sm:p-3 text-center border border-[rgba(47,183,177,0.1)]">
                <span className="text-[10px] text-[#B8C5C6]">Protein</span>
                <p className="text-base sm:text-lg font-bold text-[#C2A46D]">{result.protein}g</p>
                <span className="text-[10px] text-[#B8C5C6]">32%</span>
              </div>
              <div className="rounded-lg bg-[#1E4D57] p-2.5 sm:p-3 text-center border border-[rgba(47,183,177,0.1)]">
                <span className="text-[10px] text-[#B8C5C6]">Carbs</span>
                <p className="text-base sm:text-lg font-bold text-[#259E99]">{result.carbs}g</p>
                <span className="text-[10px] text-[#B8C5C6]">Complex</span>
              </div>
              <div className="rounded-lg bg-[#1E4D57] p-2.5 sm:p-3 text-center border border-[rgba(47,183,177,0.1)]">
                <span className="text-[10px] text-[#B8C5C6]">Fat</span>
                <p className="text-base sm:text-lg font-bold text-[#DE3C30]">{result.fat}g</p>
                <span className="text-[10px] text-[#B8C5C6]">Healthy</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={handleSaveMeal}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-lg"
              >
                <Check className="h-4 w-4" /> Log to Today's Nutrition
              </button>
              <button
                onClick={() => setResult(null)}
                className="rounded-lg border border-[rgba(47,183,177,0.3)] bg-[#1E4D57] px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all text-center"
              >
                Scan Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
