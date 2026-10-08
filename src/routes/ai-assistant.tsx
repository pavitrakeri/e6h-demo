import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  HelpCircle,
  Zap,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — e6health" },
      { name: "description", content: "24/7 personalized longevity and GLP-1 AI health assistant." },
    ],
  }),
  component: AIAssistantPage,
});

interface Message {
  id: number;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    text: "Hello Sarah! I'm your e6health longevity assistant. How are you feeling on day 45 of your protocol?",
    timestamp: "9:00 AM",
  },
  {
    id: 2,
    sender: "user",
    text: "I'm feeling pretty good! Energy levels are up and no afternoon crash today.",
    timestamp: "9:01 AM",
  },
  {
    id: 3,
    sender: "ai",
    text: "That's wonderful to hear! Your wearable telemetry confirms it: 7.5 hours of restorative sleep and an optimal HRV of 52 ms last night. Have you experienced any GLP-1 gastric fullness or nausea after breakfast?",
    timestamp: "9:02 AM",
  },
  {
    id: 4,
    sender: "user",
    text: "No nausea today at all. The 500mg Berberine and small frequent meals seem to be working very smoothly.",
    timestamp: "9:03 AM",
  },
  {
    id: 5,
    sender: "ai",
    text: "Your discipline is yielding clear physiological results. Your latest fasting glucose is down to 92 mg/dL (down from 98 mg/dL). Today's coaching recommendation: hit at least 45g of protein during your 12:30 PM lunch to preserve lean muscular mass as your body composition evolves.",
    timestamp: "9:04 AM",
  },
];

const suggestedPrompts = [
  "Feeling great!",
  "Experiencing mild nausea",
  "Tired today / low energy",
  "Recommend lunch options",
  "Review my Berberine dosage",
  "What was my sleep score?",
];

function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI clinical reasoning
    setTimeout(() => {
      let reply = "Thank you for the update, Sarah. I have logged this to your daily wellness record.";
      const lower = query.toLowerCase();

      if (lower.includes("nausea")) {
        reply = "For GLP-1 related nausea, make sure you take your digestive enzymes and sip cold electrolyte water slowly. Avoid carbonation or large boluses of fat. If symptoms persist beyond 24 hours, our clinical team will review your semaglutide titration schedule.";
      } else if (lower.includes("lunch") || lower.includes("eat")) {
        reply = "Based on your remaining macro goals (80g protein needed today), your prescribed lunch is the Mediterranean Grilled Chicken Salad (420 kcal, 45g protein). You can also order directly via our Talabat or Noon smart delivery shortcuts.";
      } else if (lower.includes("berberine") || lower.includes("dosage") || lower.includes("protocol")) {
        reply = "You are currently on Protocol v3.2: Berberine 500mg taken 2x daily before your primary meals, combined with Chromium Picolinate 200mcg. This synergy maintains your fasting glucose around 92 mg/dL.";
      } else if (lower.includes("sleep") || lower.includes("tired")) {
        reply = "Your Oura Ring logged 7.5 hours last night with 2.5 hours of Deep Sleep. If you feel sluggish today, it may be due to yesterday's higher resistance training exertion. Keep hydrated with magnesium glycinate tonight at 10 PM.";
      } else {
        reply = `Noted on "${query}". Your longevity score remains at 78/100, which is top-tier for day 45. Keep maintaining your 8,000 steps and protein targets throughout the afternoon!`;
      }

      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <DashboardLayout title="AI Assistant">
      <div className="mx-auto max-w-[1500px] p-3 sm:p-5 lg:p-8">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main Chat Interface */}
          <div className="flex h-[calc(100vh-210px)] sm:h-[calc(100vh-170px)] flex-col rounded-2xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] shadow-2xl overflow-hidden">
            {/* Chat Top Banner */}
            <div className="flex items-center justify-between border-b border-[rgba(47,183,177,0.15)] bg-[#1E4D57]/40 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2FB7B1] to-[#259E99] text-[#0B1F2A] shadow-md">
                  <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 sm:gap-2">
                    AI Longevity Coach
                    <span className="flex h-2 w-2 rounded-full bg-[#2FB7B1] animate-ping" />
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#2FB7B1]">Context: Sarah Johnson · Day 45</p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-[#B8C5C6] bg-[#0B1F2A]/60 px-2.5 sm:px-3 py-1 rounded-full border border-[rgba(47,183,177,0.1)]">
                24/7 Support
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-2xl ${m.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      m.sender === "user"
                        ? "bg-gradient-to-br from-[#2FB7B1] to-[#259E99] text-white"
                        : "bg-[#1E4D57] text-[#2FB7B1] border border-[rgba(47,183,177,0.3)]"
                    }`}
                  >
                    {m.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div>
                    <div
                      className={`rounded-2xl p-4 text-xs leading-relaxed shadow-md ${
                        m.sender === "user"
                          ? "bg-[#2FB7B1] text-[#0B1F2A] font-medium rounded-tr-none"
                          : "bg-[#1E4D57]/70 text-white rounded-tl-none border border-[rgba(47,183,177,0.15)]"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className={`block mt-1 text-[10px] text-[#B8C5C6] ${m.sender === "user" ? "text-right" : ""}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center text-xs text-[#2FB7B1]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E4D57] border border-[rgba(47,183,177,0.3)]">
                    <Bot className="h-4 w-4 animate-bounce" />
                  </div>
                  <span className="italic">AI Coach is analyzing biomarkers & typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Carousel */}
            <div className="px-6 py-2 border-t border-[rgba(47,183,177,0.1)] bg-[#0B1F2A]/40 overflow-x-auto flex gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap rounded-full bg-[#1E4D57] px-3.5 py-1.5 text-xs text-[#B8C5C6] hover:text-white hover:bg-[#2FB7B1] hover:text-[#0B1F2A] transition-colors border border-[rgba(47,183,177,0.15)]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="border-t border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-4 flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything about your protocol, meals, GLP-1 side effects, or biomarkers..."
                className="flex-1 rounded-xl border border-[rgba(47,183,177,0.2)] bg-[#1E4D57]/40 px-4 py-3 text-xs text-white placeholder-[#5E8A8A] focus:border-[#2FB7B1] focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="flex items-center justify-center rounded-xl bg-[#2FB7B1] px-5 py-3 text-sm font-bold text-[#0B1F2A] hover:bg-[#259E99] hover:text-white transition-all disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sidebar Info & Safety Card */}
          <div className="space-y-6">
            <div className="rounded-xl border border-[rgba(47,183,177,0.15)] bg-[#132F3A] p-6 shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
                <Sparkles className="h-4 w-4 text-[#2FB7B1]" /> About Your Assistant
              </div>
              <p className="text-xs text-[#B8C5C6] leading-relaxed mb-4">
                Trained on longevity clinical literature, GLP-1 metabolic pathways, and your personalized laboratory telemetry.
              </p>
              <div className="space-y-2 text-xs text-[#B8C5C6]">
                <div className="p-2.5 rounded-lg bg-[#1E4D57]/40 border border-[rgba(47,183,177,0.1)]">
                  <p className="font-semibold text-white">Continuous Biometric Context</p>
                  <p className="text-[11px] mt-0.5">Integrates your Oura sleep, Apple Watch HRV, and blood glucose data in every recommendation.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#1E4D57]/40 border border-[rgba(47,183,177,0.1)]">
                  <p className="font-semibold text-white">GLP-1 Symptom Management</p>
                  <p className="text-[11px] mt-0.5">Instant mitigation protocols for nausea, hydration, and protein spacing.</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[rgba(222,60,48,0.2)] bg-[#DE3C30]/5 p-5 text-xs text-[#B8C5C6]">
              <div className="flex items-center gap-2 font-bold text-[#DE3C30] mb-1">
                <ShieldAlert className="h-4 w-4" /> Clinical Disclaimer
              </div>
              <p className="leading-relaxed">
                e6health AI is designed for longevity lifestyle and protocol adherence guidance. For acute medical emergencies or severe adverse reactions, contact your physician immediately or dial 998 (UAE).
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
