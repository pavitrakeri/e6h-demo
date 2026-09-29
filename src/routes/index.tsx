import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, ArrowRight, Bell, Brain, BriefcaseMedical, ChartNoAxesColumnIncreasing,
  Check, ClipboardCheck, Dna, FlaskConical, Gauge, House, Menu, MessageCircle,
  Package, Pill, ScanLine, Settings, ShoppingBag, Sparkles, Utensils,
  Watch, X, Zap,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import mealImage from "@/assets/bio-aligned-meal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Longevity Dashboard — e6health" },
      { name: "description", content: "View your personalized longevity score, daily protocol, biomarkers, nutrition, and wellness check-in." },
      { property: "og:title", content: "Your Longevity Dashboard — e6health" },
      { property: "og:description", content: "Your daily view of personalized health progress, protocol, biomarkers, and nutrition." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const navItems = [
  [House, "Dashboard"], [ChartNoAxesColumnIncreasing, "My Biomarkers"],
  [ClipboardCheck, "My Protocol"], [Utensils, "Nutrition Plan"], [Watch, "Wearables"],
  [Activity, "Assessment"], [FlaskConical, "Get Lab Tests"], [MessageCircle, "AI Assistant"],
  [ShoppingBag, "Marketplace"], [Settings, "Settings"],
] as const;

const trendData = [
  { month: "Jan", glucose: 98, hba1c: 5.7 }, { month: "Feb", glucose: 96, hba1c: 5.5 },
  { month: "Mar", glucose: 94, hba1c: 5.3 }, { month: "Apr", glucose: 92, hba1c: 5.1 },
];

const symptoms = [
  [Utensils, "Hunger Level"], [Activity, "Nausea"], [Brain, "Headache"],
  [Zap, "Fatigue"], [Activity, "Diarrhea"], [Activity, "Constipation"],
  [Activity, "Bloating"], [Zap, "Energy Level"],
] as const;

function Brand() {
  return <div className="flex h-14 w-14 items-center justify-center bg-background text-sm font-bold"><span className="text-destructive">e6</span><span className="text-primary">health</span></div>;
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: string }) {
  return <div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-lg text-foreground md:text-xl">{children}</h2>{action && <button className="text-xs font-semibold text-primary hover:underline">{action} <span aria-hidden>→</span></button>}</div>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-border bg-panel p-5 ${className}`}>{children}</section>;
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({ Wellbeing: 7, Mood: 8, Sleep: 7, Appetite: 8 });
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (label: string) => setSelectedSymptoms((items) => items.includes(label) ? items.filter((item) => item !== label) : [...items, label]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {menuOpen && <button aria-label="Close navigation overlay" className="fixed inset-0 z-40 bg-background/80 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-24 items-center justify-between px-5"><Brand /><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button></div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Main navigation">
          {navItems.map(([Icon, label], index) => <button key={label} onClick={() => setMenuOpen(false)} className={`flex h-11 w-full items-center gap-3 rounded-md px-4 text-left text-sm transition-colors ${index === 0 ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/15 hover:text-foreground"}`}><Icon className="size-4" />{label}</button>)}
        </nav>
        <div className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">Your health, in one place.</div>
      </aside>

      <main className="lg:pl-56">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-panel/95 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button><h1 className="font-display text-xl md:text-2xl">Welcome back, Sarah</h1></div>
          <div className="flex items-center gap-4"><button aria-label="Notifications" className="relative text-muted-foreground hover:text-foreground"><Bell className="size-5" /><span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-destructive" /></button><div className="hidden text-right sm:block"><p className="text-xs font-bold">Sarah Johnson</p><p className="text-[10px] text-muted-foreground">GLP-1 Protocol</p></div><div className="grid size-10 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">SJ</div></div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-5 p-4 md:p-6">
          <Panel className="flex flex-col justify-between gap-4 bg-secondary px-6 py-6 sm:flex-row sm:items-center">
            <div><h2 className="font-display text-2xl md:text-3xl">Your Longevity Journey</h2><p className="mt-1 text-sm text-muted-foreground">You're on day 45 of your GLP-1 optimization protocol. Keep up the excellent progress!</p></div>
            <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1"><span className="text-xs text-muted-foreground">Protocol Status</span><span className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">Active</span></div>
          </Panel>

          <div className="grid gap-5 xl:grid-cols-4">
            <Panel><SectionTitle>Longevity Score</SectionTitle><div className="flex flex-col items-center py-6"><div className="relative grid size-32 place-items-center rounded-full bg-[conic-gradient(var(--primary)_78%,var(--muted)_0)]"><div className="grid size-28 place-items-center rounded-full bg-panel"><div className="text-center"><strong className="font-display text-3xl text-warning">78</strong><p className="text-[10px] text-muted-foreground">out of 100</p></div></div></div><p className="mt-5 text-xs text-muted-foreground">Excellent metabolic health</p></div></Panel>
            <Panel><SectionTitle>Today's Protocol</SectionTitle><div className="divide-y divide-border">{[["Take Berberine supplement","8:00 AM"],["Walk 8,000 steps","Throughout day"],["Prioritize protein at meals","All meals"]].map(([task,time]) => <div key={task} className="flex gap-3 py-3"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"/><div><p className="text-sm font-medium">{task}</p><p className="text-xs text-muted-foreground">{time}</p></div></div>)}</div></Panel>
            <Panel><SectionTitle>Wearable Data</SectionTitle><div className="space-y-3">{[["Steps","6,234"],["Sleep","7.5h"],["HRV","52 ms"]].map(([label,value]) => <div key={label} className="flex items-center justify-between rounded-md bg-panel-raised p-4"><span className="text-xs text-muted-foreground">{label}</span><strong className="text-sm">{value}</strong></div>)}</div></Panel>
            <section className="rounded-lg border border-primary/30 bg-teal-soft p-5 text-primary-foreground"><div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-md bg-background text-primary"><Pill className="size-5" /></span><div><h2 className="font-display text-lg">Your Supplement Stack</h2><p className="text-[10px] opacity-70">4 supplements</p></div></div><Package className="size-5" /></div><div className="space-y-2">{[["Berberine","500mg"],["Omega-3","2000mg"],["Magnesium","300mg"],["Chromium","200mcg"]].map(([name,dose]) => <div key={name} className="flex justify-between rounded-md bg-background/25 px-3 py-2 text-xs font-semibold"><span>● &nbsp;{name}</span><span>{dose}</span></div>)}</div><Button className="mt-4 w-full bg-background text-primary hover:bg-background/90">Discover Your Daily Stack <ArrowRight /></Button><p className="mt-3 text-center text-[10px] opacity-65">✓ Free shipping on orders over AED 100</p></section>
          </div>

          <Panel><SectionTitle action="View All">Key Biomarkers</SectionTitle><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[["Glucose","92","mg/dL","↓ 2","good"],["HbA1c","5.1","%","↓ 0.3","good"],["LDL","118","mg/dL","↑ 5","alert"],["HDL","62","mg/dL","↑ 2","alert"]].map(([label,value,unit,change,state]) => <div key={label} className={`rounded-md border p-4 ${state === "alert" ? "border-warning/15 bg-warning/5" : "border-primary/10 bg-secondary"}`}><div className="flex justify-between text-xs text-muted-foreground"><span>{label}</span><span className={state === "alert" ? "text-destructive" : "text-primary"}>{change}</span></div><strong className={state === "alert" ? "mt-2 block text-xl text-destructive" : "mt-2 block text-xl text-primary"}>{value}</strong><span className="text-xs text-muted-foreground">{unit}</span></div>)}</div></Panel>

          <Panel><SectionTitle>Biomarker Trends</SectionTitle><div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}><defs><linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02}/></linearGradient></defs><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/><YAxis domain={[0,110]} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 6 }} labelStyle={{ color: "var(--foreground)" }}/><Area type="monotone" dataKey="glucose" stroke="var(--primary)" strokeWidth={2} fill="url(#trendFill)" /></AreaChart></ResponsiveContainer></div></Panel>

          <div className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
            <Panel><SectionTitle action="View Full Plan">Today's Nutrition Plan</SectionTitle><div className="space-y-3">{[["Breakfast","Egg white scramble with spinach","7:00 AM"],["Lunch","Grilled chicken with roasted vegetables","12:30 PM"],["Dinner","Salmon with quinoa and broccoli","6:30 PM"]].map(([meal,dish,time],i) => <div key={meal} className="flex items-center gap-4 rounded-md bg-secondary p-4"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 font-display text-primary">{i+1}</span><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-primary">{meal}</p><p className="truncate text-sm">{dish}</p></div><span className="text-xs text-muted-foreground">{time}</span></div>)}</div></Panel>
            <section className="relative min-h-72 overflow-hidden rounded-lg border border-border"><img src={mealImage} alt="Salmon, quinoa and vegetables in a dark bowl" width={928} height={720} loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent"/><div className="relative flex h-full max-w-sm flex-col justify-center p-6"><span className="mb-3 grid size-11 place-items-center rounded-md bg-primary text-primary-foreground"><ScanLine /></span><p className="text-xs font-bold uppercase text-primary">Smart Delivery</p><h2 className="mt-2 font-display text-3xl">Busy day?</h2><p className="mt-2 text-sm text-muted-foreground">Your bio-aligned meal is ready. Smart recommendations based on your protocol.</p><div className="mt-5 flex flex-wrap gap-2"><Button size="sm">Order from Talabat</Button><Button size="sm" variant="secondary">Order from Noon</Button></div><p className="mt-3 text-[10px] text-muted-foreground">30–45 min delivery · Free over AED 50</p></div></section>
          </div>

          <Panel><div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-start"><div><SectionTitle>Lab Tests Available</SectionTitle><p className="-mt-3 text-xs text-muted-foreground">Home collection service · UAE/KSA</p></div><Dna className="size-6 text-primary" /></div><div className="grid gap-3 md:grid-cols-3">{[["Fitness DNA Check","LAB PARTNER","800 AED","DNA insights"],["Life Platinum Package","Lifepharmacy","135 AED","63 tests"],["Gut Health","LAB PARTNER","1600 AED","Microbiome"]].map(([name,provider,price,detail]) => <article key={name} className="rounded-md border border-border bg-secondary p-4"><p className="text-[10px] font-bold uppercase text-primary">{provider}</p><h3 className="mt-2 font-display text-lg">{name}</h3><div className="mt-5 flex items-end justify-between"><span className="text-xs text-muted-foreground">{detail}</span><strong>{price}</strong></div></article>)}</div><div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><p className="text-xs text-muted-foreground">✓ Results in 24–48 hours &nbsp; | &nbsp; ✓ Certified labs</p><Button variant="outline" size="sm">Explore All Tests <ArrowRight /></Button></div></Panel>

          <Panel><div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase text-primary">Daily Wellness Check-In</p><h2 className="mt-2 font-display text-3xl">How are you feeling today?</h2><p className="mt-2 text-sm text-muted-foreground">Your response helps us optimize your protocol.</p><div className="mt-6 rounded-md bg-secondary p-4"><div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="size-4 text-primary" /> Today's Insight</div><p className="mt-2 text-xs leading-5 text-muted-foreground">{selectedSymptoms.length === 0 ? "Great! No symptoms reported. Keep maintaining your excellent protocol adherence." : "Thanks for checking in. We'll use your response to tailor your daily guidance."}</p></div></div><div><h3 className="mb-3 text-sm font-semibold">Any symptoms today?</h3><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{symptoms.map(([Icon,label]) => { const active=selectedSymptoms.includes(label); return <button key={label} onClick={() => toggleSymptom(label)} aria-pressed={active} className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-md border p-2 text-xs transition-colors ${active ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary text-muted-foreground hover:border-primary/40"}`}><Icon className="size-5" />{label}</button>})}</div><h3 className="mb-4 mt-6 text-sm font-semibold">Rate your wellness (1–10)</h3><div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{Object.entries(ratings).map(([label,value]) => <div key={label}><div className="mb-2 flex justify-between text-xs"><span>{label}</span><strong className="text-primary">{value}/10</strong></div><Slider min={1} max={10} step={1} value={[value]} onValueChange={([next]) => setRatings((current) => ({...current,[label]:next ?? value}))}/></div>)}</div><div className="mt-6 flex justify-end"><Button onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2200); }}>{saved ? <><Check /> Check-In Saved</> : "Save Check-In"}</Button></div></div></div></Panel>
          <footer className="flex flex-col justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row"><span>© 2026 e6health. Your health data, simplified.</span><span>For wellness guidance only · Not medical advice</span></footer>
        </div>
      </main>
    </div>
  );
}