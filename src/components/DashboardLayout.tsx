import { useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  BarChart3,
  Shield,
  UtensilsCrossed,
  Flame,
  Zap,
  Moon,
  Brain,
  ShoppingBag,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Sparkles,
  FileText,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/", emoji: "🏠", icon: Home },
  { id: "biomarkers", label: "My Biomarkers", href: "/biomarkers", emoji: "📊", icon: BarChart3 },
  { id: "protocol", label: "My Protocol", href: "/protocol", emoji: "🛡️", icon: Shield },
  { id: "nutrition", label: "My Nutrition Plan", href: "/nutrition", emoji: "🍴", icon: UtensilsCrossed },
  { id: "movement", label: "My Movement", href: "/movement", emoji: "🏃", icon: Flame },
  { id: "vitality", label: "My Vitality", href: "/vitality", emoji: "⚡", icon: Zap },
  { id: "recovery", label: "My Recovery", href: "/recovery", emoji: "🌙", icon: Moon },
  { id: "mind-connection", label: "My Mind & Connection", href: "/mind-connection", emoji: "🧠", icon: Brain },
  { id: "marketplace", label: "Marketplace", href: "/marketplace", emoji: "🛍️", icon: ShoppingBag },
  { id: "settings", label: "Settings", href: "/settings", emoji: "⚙️", icon: Settings },
];

// Quick bottom bar items for mobile
const mobileBottomNav = [
  { id: "dashboard", label: "Home", href: "/", emoji: "🏠" },
  { id: "biomarkers", label: "Biomarkers", href: "/biomarkers", emoji: "📊" },
  { id: "protocol", label: "Protocol", href: "/protocol", emoji: "🛡️" },
  { id: "nutrition", label: "Nutrition", href: "/nutrition", emoji: "🍴" },
  { id: "marketplace", label: "Market", href: "/marketplace", emoji: "🛍️" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0B1F2A] text-foreground">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Responsive drawer on mobile, collapsible on desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[rgba(47,183,177,0.12)] bg-[#0B1F2A] transition-all duration-300 w-72 sm:w-80 lg:static ${
          mobileMenuOpen
            ? "translate-x-0 shadow-2xl"
            : "-translate-x-full lg:translate-x-0"
        } ${sidebarExpanded ? "lg:w-64" : "lg:w-20"}`}
      >
        {/* Sidebar Header / Logo */}
        <div className="flex h-16 sm:h-20 items-center justify-between border-b border-[rgba(47,183,177,0.12)] px-4 sm:px-5">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#DE3C30] to-[#2FB7B1] text-base sm:text-lg font-bold text-white shadow-lg">
              <span style={{ fontFamily: "'Playfair Display', serif" }}>e6</span>
            </div>
            {/* Show title if mobile OR if expanded on desktop */}
            <div className={`flex flex-col ${!sidebarExpanded ? "lg:hidden" : ""}`}>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                <span className="text-[#DE3C30]">e6</span>
                <span className="text-[#2FB7B1]">health</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#B8C5C6] uppercase tracking-wider font-semibold">
                Longevity Platform
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-[#B8C5C6] hover:bg-[#132F3A] hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3 sm:py-4" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = isCurrent(item.href);
            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                  active
                    ? "bg-[#2FB7B1] text-[#0B1F2A] font-bold shadow-md shadow-[#2FB7B1]/20"
                    : "text-[#B8C5C6] hover:bg-[#1E4D57]/50 hover:text-white"
                } ${!sidebarExpanded ? "lg:justify-center lg:px-2" : ""}`}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <span className="text-base sm:text-lg flex-shrink-0 leading-none">{item.emoji}</span>
                <span className={`truncate ${!sidebarExpanded ? "lg:hidden" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Longevity Flywheel Mini Banner */}
        <div className={`m-3 p-3 rounded-xl bg-gradient-to-br from-[#1E4D57]/60 to-[#132F3A] border border-[rgba(47,183,177,0.15)] text-[11px] text-[#B8C5C6] ${!sidebarExpanded ? "lg:hidden" : ""}`}>
          <div className="flex items-center gap-1.5 font-bold text-[#2FB7B1] mb-1 text-[11px]">
            <Sparkles className="h-3.5 w-3.5" /> Retention Flywheel
          </div>
          <p className="text-[10px] leading-snug opacity-80">
            Assessment → Protocol → Labs → Supplements → Personalization
          </p>
        </div>

        {/* Sidebar Collapse Toggle (Desktop only) */}
        <div className="hidden border-t border-[rgba(47,183,177,0.12)] p-4 lg:block">
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-[#2FB7B1] hover:bg-[#1E4D57]/60 transition-colors"
            title={sidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {sidebarExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Responsive Header */}
        <header className="sticky top-0 z-30 flex h-14 sm:h-16 lg:h-20 flex-shrink-0 items-center justify-between border-b border-[rgba(47,183,177,0.12)] bg-[#132F3A]/95 px-3 sm:px-6 lg:px-8 backdrop-blur">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-1.5 sm:p-2 text-[#B8C5C6] hover:bg-[#1E4D57] hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <h1
              className="text-base sm:text-xl lg:text-2xl font-bold text-white truncate"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title || "Welcome back, Sarah"}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 flex-shrink-0">
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
                className="relative rounded-lg p-1.5 sm:p-2 text-[#B8C5C6] hover:bg-[#1E4D57] hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#DE3C30] ring-2 ring-[#132F3A]" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-xl border border-[rgba(47,183,177,0.25)] bg-[#132F3A] p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-[rgba(47,183,177,0.12)] pb-3">
                    <h4 className="text-sm font-bold text-white">Notifications</h4>
                    <span className="text-[10px] font-semibold text-[#2FB7B1] bg-[#2FB7B1]/10 px-2 py-0.5 rounded-full">
                      2 New
                    </span>
                  </div>
                  <div className="divide-y divide-[rgba(47,183,177,0.1)] text-xs">
                    <div className="py-2.5">
                      <p className="font-semibold text-white">Next Lab Test Scheduled</p>
                      <p className="text-[#B8C5C6] mt-0.5">Comprehensive panel due May 15, 2026.</p>
                      <span className="text-[10px] text-[#2FB7B1]">1 hour ago</span>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-white">Protocol Optimized</p>
                      <p className="text-[#B8C5C6] mt-0.5">Berberine adjusted to 500mg based on glucose improvements.</p>
                      <span className="text-[10px] text-[#2FB7B1]">Yesterday</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 sm:gap-3 border-l border-[rgba(47,183,177,0.12)] pl-2 sm:pl-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-white leading-tight">Sarah Johnson</p>
                <p className="text-xs text-[#2FB7B1] font-medium">GLP-1 Protocol</p>
              </div>
              <Link
                to="/settings"
                className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2FB7B1] to-[#259E99] text-xs sm:text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
                title="Settings"
              >
                SJ
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body (with pb-28 on mobile so bottom bar never obscures content) */}
        <main className="flex-1 overflow-y-auto bg-[#0B1F2A] pb-28 sm:pb-24 lg:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (Screens < lg) */}
        <nav
          aria-label="Mobile bottom navigation"
          className="fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(47,183,177,0.15)] bg-[#132F3A]/95 backdrop-blur-md px-1 sm:px-3 py-1.5 flex items-center justify-around lg:hidden"
        >
          {mobileBottomNav.map((item) => {
            const active = isCurrent(item.href);
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`flex flex-col items-center justify-center min-w-[50px] py-1 px-1 rounded-lg transition-colors ${
                  active ? "text-[#2FB7B1] font-bold" : "text-[#B8C5C6] hover:text-white"
                }`}
              >
                <span className="text-base sm:text-lg leading-none">{item.emoji}</span>
                <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center min-w-[50px] py-1 px-1 rounded-lg text-[#B8C5C6] hover:text-white"
            aria-label="Open full menu"
          >
            <span className="text-base sm:text-lg leading-none">☰</span>
            <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
