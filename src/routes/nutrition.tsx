import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Utensils,
  ScanLine,
  Clock,
  Sparkles,
  Check,
  ShoppingBag,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FoodScanner } from "@/components/FoodScanner";
import { BusyDayWidget } from "@/components/BusyDayWidget";

export const Route = createFileRoute("/nutrition")({
  head: () => ({
    meta: [
      { title: "Nutrition Plan — e6health" },
      { name: "description", content: "Personalized bio-aligned nutrition, macros, and GLP-1 meal schedules." },
    ],
  }),
  component: NutritionPage,
});

interface Meal {
  name: string;
  time: string;
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  prepTime: string;
  glp1Note: string;
  image: string;
}

const macroTargets = {
  calories: 2200,
  protein: 180,
  carbs: 140,
  fat: 70,
};

const mealsToday: Meal[] = [
  {
    name: "Breakfast",
    time: "7:00 AM",
    meal: "Avocado & Poached Egg Toast",
    calories: 280,
    protein: 32,
    carbs: 8,
    fat: 12,
    ingredients: ["2 slices artisan sourdough", "1 ripe avocado", "2 organic poached eggs", "Microgreens & seeds", "Flaky sea salt"],
    prepTime: "10 min",
    glp1Note: "High satiety and stable glycemic release prevents morning nausea.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=500&fit=crop",
  },
  {
    name: "Lunch",
    time: "12:30 PM",
    meal: "Mediterranean Grilled Chicken Salad",
    calories: 420,
    protein: 45,
    carbs: 28,
    fat: 14,
    ingredients: ["6 oz grilled chicken breast", "Mixed baby greens", "Cherry heirloom tomatoes", "Feta cheese", "Extra virgin olive oil"],
    prepTime: "20 min",
    glp1Note: "Lean amino acids preserve lean mass during metabolic deficit.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=500&fit=crop",
  },
  {
    name: "Dinner",
    time: "6:30 PM",
    meal: "Wild Salmon Bowl with Quinoa",
    calories: 520,
    protein: 42,
    carbs: 35,
    fat: 22,
    ingredients: ["6 oz Alaskan wild salmon", "1/2 cup cooked organic quinoa", "Charred broccoli florets", "Sweet potato cubes", "Meyer lemon wedge"],
    prepTime: "25 min",
    glp1Note: "Anti-inflammatory EPA/DHA fatty acids support cell membrane fluidity.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop",
  },
];

const weeklyPlanner = [
  { day: "Monday", breakfast: "Avocado & Egg Toast", lunch: "Mediterranean Chicken Salad", dinner: "Wild Salmon Bowl" },
  { day: "Tuesday", breakfast: "Greek Yogurt & Berries", lunch: "Smoked Turkey Wrap", dinner: "Grass-Fed Steak & Sweet Potato" },
  { day: "Wednesday", breakfast: "Steel-Cut Oats with Walnuts", lunch: "Wild Tuna Niçoise Salad", dinner: "Baked Cod with Asparagus" },
  { day: "Thursday", breakfast: "Spinach Egg White Scramble", lunch: "Grilled Chicken & Vegetables", dinner: "Wild Salmon Bowl" },
  { day: "Friday", breakfast: "Superfood Protein Smoothie", lunch: "Chicken Shawarma Bowl", dinner: "Grass-Fed Beef & Broccoli" },
  { day: "Saturday", breakfast: "Almond Flour Pancakes", lunch: "Salmon & Avocado Tartare", dinner: "Roasted Lamb Cutlets" },
  { day: "Sunday", breakfast: "Poached Eggs Florentine", lunch: "Herb Rotisserie Chicken", dinner: "Sea Bass with Steamed Greens" },
];

const groceryCategories = [
  {
    category: "Proteins",
    items: ["Organic Egg Whites (1 carton)", "Free-Range Chicken Breast (2 lbs)", "Wild Alaskan Salmon (1.5 lbs)", "Greek Yogurt 0% (32 oz)"],
  },
  {
    category: "Produce & Greens",
    items: ["Baby Spinach (1 container)", "Organic Broccoli (2 heads)", "Avocados (4 count)", "Rainbow Bell Peppers (3 count)", "Asparagus spears (1 lb)"],
  },
  {
    category: "Complex Carbs & Seeds",
    items: ["Organic Tri-Color Quinoa (1 lb)", "Sprouted Rolled Oats (1 lb)", "Raw Almonds (8 oz)", "Chia Seeds (8 oz)"],
  },
  {
    category: "Healthy Oils & Pantry",
    items: ["Cold-Pressed Extra Virgin Olive Oil", "Pink Himalayan Salt", "Organic Lemons (4 count)", "Raw Apple Cider Vinegar"],
  },
];

function NutritionPage() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [loggedMeals, setLoggedMeals] = useState<any[]>([]);

  const toggleGroceryItem = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleMealScanned = (meal: any) => {
    setLoggedMeals((prev) => [meal, ...prev]);
  };

  return (
    <DashboardLayout title="Nutrition Plan">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.1)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Personalized Nutrition Plan
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Engineered specifically for GLP-1 metabolic preservation, satiety, and energy continuity.
            </p>
          </div>
          <button
            onClick={() => setScannerOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-4 sm:px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all w-full sm:w-auto"
          >
            <ScanLine className="h-4 w-4" /> AI Food Scanner
          </button>
        </div>

        {/* 4 Daily Macro Target Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Calories</span>
              <Flame className="h-4 w-4 text-[#DE3C30] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#2FB7B1]">{macroTargets.calories}</p>
            <p className="text-[10px] sm:text-xs text-[#B8C5C6] mt-0.5 sm:mt-1">kcal · Mild deficit</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Protein</span>
              <Dumbbell className="h-4 w-4 text-[#C2A46D] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#C2A46D]">{macroTargets.protein}g</p>
            <p className="text-[10px] sm:text-xs text-[#B8C5C6] mt-0.5 sm:mt-1">1.8g / kg lean mass</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Complex Carbs</span>
              <Wheat className="h-4 w-4 text-[#259E99] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#259E99]">{macroTargets.carbs}g</p>
            <p className="text-[10px] sm:text-xs text-[#B8C5C6] mt-0.5 sm:mt-1">Low GI & 35g+ fiber</p>
          </div>

          <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#B8C5C6] mb-1.5 sm:mb-2">
              <span className="font-semibold text-white truncate text-[11px] sm:text-xs">Healthy Fats</span>
              <Droplet className="h-4 w-4 text-[#2FB7B1] shrink-0" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#2FB7B1]">{macroTargets.fat}g</p>
            <p className="text-[10px] sm:text-xs text-[#B8C5C6] mt-0.5 sm:mt-1">Omega-3 rich lipids</p>
          </div>
        </div>

        {/* Smart Delivery Banner */}
        <BusyDayWidget />

        {/* Recently Scanned Meals (if any) */}
        {loggedMeals.length > 0 && (
          <div className="rounded-xl border border-[#2FB7B1]/40 bg-[#132F3A] p-6 shadow-xl animate-in fade-in">
            <div className="flex items-center gap-2 mb-4 text-[#2FB7B1]">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-lg font-bold text-white">Just Logged via AI Scanner</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {loggedMeals.map((meal, index) => (
                <div key={index} className="rounded-lg bg-[#1E4D57]/40 p-4 border border-[rgba(47,183,177,0.2)]">
                  <p className="font-bold text-white">{meal.name}</p>
                  <p className="text-xs text-[#2FB7B1] mt-1">
                    {meal.calories} kcal · {meal.protein}g protein · {meal.carbs}g carbs
                  </p>
                  <span className="text-[10px] text-[#B8C5C6]">Logged at {meal.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's Prescribed Meals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Today's Bio-Aligned Meal Plan
              </h3>
              <p className="text-xs text-[#B8C5C6]">Time-restricted feeding window: 7:00 AM – 7:00 PM</p>
            </div>
            <button
              onClick={() => setScannerOpen(true)}
              className="text-xs font-semibold text-[#2FB7B1] hover:underline"
            >
              Scan a customized meal →
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {mealsToday.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.meal}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132F3A] via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#0B1F2A]/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#2FB7B1] border border-[rgba(47,183,177,0.2)]">
                      {item.time}
                    </span>
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0B1F2A]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white">
                      <Clock className="h-3 w-3 text-[#2FB7B1]" /> {item.prepTime}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2FB7B1]">{item.name}</span>
                    <h4 className="text-xl font-bold text-white mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.meal}
                    </h4>

                    {/* Macros Grid */}
                    <div className="my-4 grid grid-cols-4 gap-1.5 rounded-lg bg-[#0B1F2A]/50 p-2.5 text-center">
                      <div>
                        <span className="text-[10px] text-[#B8C5C6]">Calories</span>
                        <p className="text-xs font-bold text-white">{item.calories}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#B8C5C6]">Protein</span>
                        <p className="text-xs font-bold text-[#C2A46D]">{item.protein}g</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#B8C5C6]">Carbs</span>
                        <p className="text-xs font-bold text-[#259E99]">{item.carbs}g</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#B8C5C6]">Fat</span>
                        <p className="text-xs font-bold text-[#DE3C30]">{item.fat}g</p>
                      </div>
                    </div>

                    {/* Ingredients list */}
                    <p className="text-xs font-semibold text-white mb-2">Ingredients:</p>
                    <ul className="space-y-1 text-xs text-[#B8C5C6] mb-4">
                      {item.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2FB7B1]" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>

                    {/* GLP-1 note */}
                    <div className="rounded-lg bg-[#1E4D57]/40 p-3 border border-[rgba(47,183,177,0.15)] text-[11px] text-[#B8C5C6]">
                      <span className="font-bold text-[#2FB7B1]">GLP-1 Note: </span>
                      {item.glp1Note}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => alert(`Marked ${item.meal} as consumed!`)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1E4D57] py-2.5 text-xs font-bold text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-all shadow-md"
                  >
                    <Check className="h-4 w-4" /> Log Consumed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Meal Planner */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              7-Day Rotation Schedule
            </h3>
            <span className="text-[11px] text-[#2FB7B1] sm:hidden">Swipe horizontally to view full menu →</span>
          </div>
          <div className="w-full overflow-x-auto rounded-lg border border-[rgba(47,183,177,0.1)]">
            <table className="w-full min-w-[580px] text-left text-xs text-[#B8C5C6]">
              <thead>
                <tr className="border-b border-[rgba(47,183,177,0.15)] bg-[#0B1F2A]/60 text-[#2FB7B1] font-bold">
                  <th className="py-3 px-3 sm:px-4">Day</th>
                  <th className="py-3 px-3 sm:px-4">Breakfast (7:00 AM)</th>
                  <th className="py-3 px-3 sm:px-4">Lunch (12:30 PM)</th>
                  <th className="py-3 px-3 sm:px-4">Dinner (6:30 PM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(47,183,177,0.1)]">
                {weeklyPlanner.map((row) => (
                  <tr key={row.day} className="hover:bg-[#1E4D57]/20 transition-colors">
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold text-white">{row.day}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4">{row.breakfast}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4">{row.lunch}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4">{row.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Smart Grocery List */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 sm:p-6 shadow-xl">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#2FB7B1]/20 text-[#2FB7B1]">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Smart Grocery List
                </h3>
                <p className="text-[11px] sm:text-xs text-[#B8C5C6]">Pre-calculated portions for 7-day protocol adherence</p>
              </div>
            </div>
            <button
              onClick={() => setCheckedItems([])}
              className="text-xs font-semibold text-[#2FB7B1] hover:underline"
            >
              Reset List
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {groceryCategories.map((group) => (
              <div key={group.category} className="rounded-xl bg-[#1E4D57]/30 p-4 border border-[rgba(47,183,177,0.1)]">
                <h4 className="text-sm font-bold text-[#2FB7B1] mb-3">{group.category}</h4>
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const isChecked = checkedItems.includes(item);
                    return (
                      <label
                        key={item}
                        onClick={() => toggleGroceryItem(item)}
                        className={`flex items-start gap-2.5 cursor-pointer text-xs p-1.5 rounded transition-colors ${
                          isChecked ? "line-through text-[#B8C5C6]/50 bg-black/10" : "text-[#B8C5C6] hover:text-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded border-[#2FB7B1] accent-[#2FB7B1]"
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FoodScanner isOpen={scannerOpen} onClose={() => setScannerOpen(false)} onScanComplete={handleMealScanned} />
    </DashboardLayout>
  );
}
