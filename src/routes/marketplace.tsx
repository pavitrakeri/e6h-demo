import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Longevity Marketplace — e6health" },
      { name: "description", content: "Clinical-grade longevity supplements and GLP-1 supportive products." },
    ],
  }),
  component: MarketplacePage,
});

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  glp1Benefit: string;
  inStock: boolean;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Berberine Phytosome 500mg",
    brand: "Lifepharmacy Longevity",
    price: 45.0,
    rating: 4.9,
    reviews: 642,
    image: "https://images.unsplash.com/photo-1584308666744-24d5f400f6f1?w=400&h=400&fit=crop",
    category: "metabolic",
    glp1Benefit: "Clinically enhances insulin sensitivity and glycemic stability on GLP-1",
    inStock: true,
    discount: 15,
  },
  {
    id: "2",
    name: "Omega-3 Triple Strength 2000mg",
    brand: "Lifepharmacy Clinical",
    price: 38.5,
    rating: 4.8,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=400&h=400&fit=crop",
    category: "metabolic",
    glp1Benefit: "High EPA/DHA reduces systemic vascular inflammation and optimizes lipid panels",
    inStock: true,
  },
  {
    id: "3",
    name: "Magnesium Glycinate 400mg",
    brand: "Lifepharmacy Sleep",
    price: 32.0,
    rating: 4.9,
    reviews: 780,
    image: "https://images.unsplash.com/photo-1585435925550-f3f9f9c1e1f0?w=400&h=400&fit=crop",
    category: "sleep",
    glp1Benefit: "Deep slow-wave sleep promoter; relaxes GI smooth muscle and elevates night HRV",
    inStock: true,
    discount: 10,
  },
  {
    id: "4",
    name: "Vitamin D3 5000IU + K2",
    brand: "Lifepharmacy Essentials",
    price: 28.99,
    rating: 4.9,
    reviews: 891,
    image: "https://images.unsplash.com/photo-1584308666744-24d5f400f6f1?w=400&h=400&fit=crop",
    category: "vitamins",
    glp1Benefit: "Sustains bone mineral density during rapid adipose tissue reduction",
    inStock: true,
  },
  {
    id: "5",
    name: "Digestive Enzymes & Probiotics Pro",
    brand: "Lifepharmacy Digestive",
    price: 42.5,
    rating: 4.7,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=400&h=400&fit=crop",
    category: "digestive",
    glp1Benefit: "Combats GLP-1 delayed gastric emptying discomfort, bloating, and sulfur burps",
    inStock: true,
    discount: 20,
  },
  {
    id: "6",
    name: "Zinc Carnosine & Citrate 30mg",
    brand: "Lifepharmacy Health",
    price: 24.99,
    rating: 4.5,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1585435925550-f3f9f9c1e1f0?w=400&h=400&fit=crop",
    category: "minerals",
    glp1Benefit: "Protects mucosal lining of the stomach and strengthens cellular immunity",
    inStock: true,
  },
  {
    id: "7",
    name: "Hydrolyzed Collagen Peptides 500g",
    brand: "Lifepharmacy Beauty",
    price: 55.0,
    rating: 4.8,
    reviews: 623,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=400&h=400&fit=crop",
    category: "protein",
    glp1Benefit: "Prevents facial tissue laxity ('Ozempic face') and preserves joint cartilage",
    inStock: true,
  },
  {
    id: "8",
    name: "Active Methylated B-Complex Plus",
    brand: "Lifepharmacy Cellular",
    price: 35.5,
    rating: 4.6,
    reviews: 356,
    image: "https://images.unsplash.com/photo-1584308666744-24d5f400f6f1?w=400&h=400&fit=crop",
    category: "vitamins",
    glp1Benefit: "Sustained mitochondrial energy production and nervous system stabilization",
    inStock: true,
    discount: 12,
  },
];

const categories = [
  { id: "all", name: "All Supplements" },
  { id: "metabolic", name: "Metabolic & Glucose" },
  { id: "sleep", name: "Sleep & Circadian" },
  { id: "vitamins", name: "Essential Vitamins" },
  { id: "digestive", name: "Digestive & Gut Health" },
  { id: "minerals", name: "Minerals & Electrolytes" },
  { id: "protein", name: "Protein & Collagen" },
];

function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([
    { ...products[0], quantity: 1 },
    { ...products[2], quantity: 1 },
  ]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCart([]);
      setCartDrawerOpen(false);
    }, 2500);
  };

  return (
    <DashboardLayout title="Marketplace">
      <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-8 p-3 sm:p-5 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[rgba(47,183,177,0.1)] pb-4 sm:pb-6 md:flex-row md:items-center">
          <div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Longevity Supplement Stack
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#B8C5C6]">
              Third-party tested, pharmaceutical grade formulations optimized for GLP-1 and longevity protocols.
            </p>
          </div>
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="relative flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] px-4 sm:px-5 py-2.5 text-xs font-bold text-[#0B1F2A] shadow-md hover:bg-[#259E99] hover:text-white transition-all w-full sm:w-auto"
          >
            <ShoppingBag className="h-4 w-4" /> View Cart ({totalItems})
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#DE3C30] text-[10px] font-bold text-white ring-2 ring-[#0B1F2A]">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="rounded-xl border border-[rgba(47,183,177,0.2)] bg-gradient-to-r from-[#1E4D57] to-[#132F3A] p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-[#B8C5C6]">
          <div className="flex items-center gap-2 text-white">
            <Truck className="h-4 w-4 text-[#2FB7B1] shrink-0" />
            <span className="font-semibold">Fast UAE & GCC Dispatch</span>
            <span className="hidden sm:inline">· Same-day delivery in Dubai/Abu Dhabi</span>
          </div>
          <span className="font-bold text-[#2FB7B1]">
            ✓ Free courier delivery over 100 AED
          </span>
        </div>

        {/* Category Pills (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`rounded-lg px-3.5 sm:px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? "bg-[#2FB7B1] text-[#0B1F2A] shadow-md shadow-[#2FB7B1]/20"
                  : "bg-[#132F3A] text-[#B8C5C6] border border-[rgba(47,183,177,0.15)] hover:border-[#2FB7B1]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] shadow-xl transition-all hover:border-[#2FB7B1]/40"
            >
              <div>
                <div className="relative h-48 w-full bg-[#0B1F2A]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {product.discount && (
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-[#DE3C30] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
                      {product.discount}% OFF
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#0B1F2A]/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-[#2FB7B1]">
                    {product.brand}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-[11px] text-[#C2A46D] mb-1">
                    <Star className="h-3 w-3 fill-[#C2A46D]" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-[#B8C5C6]">({product.reviews})</span>
                  </div>

                  <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {product.name}
                  </h3>

                  <div className="mt-2 rounded-lg bg-[#1E4D57]/40 p-2.5 border border-[rgba(47,183,177,0.1)] text-[11px] text-[#B8C5C6] leading-relaxed">
                    <span className="font-bold text-[#2FB7B1]">Protocol Benefit: </span>
                    {product.glp1Benefit}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-[#B8C5C6]">Price</span>
                    <p className="text-xl font-bold text-white">{product.price.toFixed(2)} AED</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#2FB7B1] bg-[#2FB7B1]/10 px-2 py-0.5 rounded-full">
                    In Stock
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] py-2.5 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-md"
                >
                  <Plus className="h-4 w-4" /> Add to Daily Stack
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Slide-Over Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10 w-full sm:w-auto">
            <div className="w-full sm:w-[440px] max-w-full bg-[#132F3A] border-l border-[rgba(47,183,177,0.2)] shadow-2xl flex flex-col justify-between h-full">
              {/* Drawer Header */}
              <div className="p-4 sm:p-6 border-b border-[rgba(47,183,177,0.15)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#2FB7B1]" />
                  <h3 className="text-base sm:text-lg font-bold text-white">Your Longevity Cart</h3>
                  <span className="text-xs bg-[#2FB7B1]/20 text-[#2FB7B1] px-2 py-0.5 rounded-full font-bold">
                    {totalItems}
                  </span>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="rounded-lg p-2 text-[#B8C5C6] hover:bg-[#1E4D57] hover:text-white"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Free Shipping Tracker */}
              <div className="px-6 py-3 bg-[#0B1F2A]/60 border-b border-[rgba(47,183,177,0.1)] text-xs">
                {isFreeShipping ? (
                  <p className="text-[#2FB7B1] font-semibold flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" /> You unlocked Free UAE Shipping!
                  </p>
                ) : (
                  <div>
                    <p className="text-[#B8C5C6]">
                      Add <span className="text-[#2FB7B1] font-bold">{(freeShippingThreshold - subtotal).toFixed(2)} AED</span> more for Free Shipping
                    </p>
                    <div className="w-full bg-[#1E4D57] h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div
                        className="bg-[#2FB7B1] h-full"
                        style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Body (Items) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-[#B8C5C6]">
                    <ShoppingBag className="mx-auto h-12 w-12 text-[#2FB7B1]/30 mb-2" />
                    <p className="text-sm font-semibold text-white">Your cart is empty</p>
                    <p className="text-xs mt-1">Add items from your personalized supplement stack</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl bg-[#1E4D57]/40 p-3 border border-[rgba(47,183,177,0.15)]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover border border-[rgba(47,183,177,0.2)]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-white">{item.name}</p>
                        <p className="text-xs font-semibold text-[#2FB7B1] mt-0.5">
                          {item.price.toFixed(2)} AED
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="rounded bg-[#0B1F2A] p-1 text-[#B8C5C6] hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="rounded bg-[#0B1F2A] p-1 text-[#B8C5C6] hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#DE3C30] hover:opacity-80 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[rgba(47,183,177,0.15)] bg-[#0B1F2A]/40 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#B8C5C6]">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">{subtotal.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between text-[#B8C5C6]">
                      <span>Courier Shipping (Dubai/UAE)</span>
                      <span className="text-white font-semibold">
                        {isFreeShipping ? "FREE" : "15.00 AED"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[rgba(47,183,177,0.1)]">
                      <span>Total</span>
                      <span className="text-[#2FB7B1]">
                        {(subtotal + (isFreeShipping ? 0 : 15)).toFixed(2)} AED
                      </span>
                    </div>
                  </div>

                  {checkoutSuccess ? (
                    <div className="rounded-lg bg-[#2FB7B1] p-3 text-center text-[#0B1F2A] font-bold text-xs flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" /> Order Confirmed! Dispatched via Lifepharmacy UAE.
                    </div>
                  ) : (
                    <button
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2FB7B1] py-3 text-xs font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all shadow-lg"
                    >
                      <ShieldCheck className="h-4 w-4" /> Proceed to Instant Checkout
                    </button>
                  )}
                  <p className="text-center text-[10px] text-[#B8C5C6]">
                    Encrypted payment · Visa, Mastercard, Apple Pay & Tabby
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
