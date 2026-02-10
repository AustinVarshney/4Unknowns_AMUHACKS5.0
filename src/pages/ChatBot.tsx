import { ArrowLeft, Mic, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import PageWrapper from "../components/PageWrapper";
import PanicIndicator, { type PanicLevel } from "../components/PanicIndicator";

interface Message {
  text: string;
  isUser: boolean;
}

const crisisLabels: Record<string, string> = {
  medical: "Medical Emergency",
  fire: "Fire Emergency",
  safety: "Personal Safety",
  other: "Other Crisis",
};

const assistantFlows: Record<string, string[]> = {
  medical: [
    "Stay calm. I'm here to help you through this. 💙",
    "Is the person conscious and breathing?",
    "Are you or anyone nearby trained in first aid?",
    "Okay, I'm going to walk you through some steps. Stay with me.",
    "Let me guide you to the step-by-step tutorial for this situation.",
  ],
  fire: [
    "Stay calm, your safety comes first. 💙",
    "Is there visible fire or just smoke?",
    "Can you safely evacuate the building?",
    "Do NOT use elevators. Head to the nearest exit staying low.",
    "Let me guide you through the fire safety steps.",
  ],
  safety: [
    "I'm here for you. You're doing the right thing reaching out. 💙",
    "Are you in immediate physical danger right now?",
    "Can you move to a safe location nearby?",
    "Stay calm, this can be handled. I'll guide you step by step.",
    "Let me walk you through the safety protocol.",
  ],
  other: [
    "I'm listening. Tell me what's happening. 💙",
    "Can you describe the situation briefly?",
    "Is anyone in immediate danger?",
    "You're doing the right thing. Let me help you work through this.",
    "I'll guide you through some practical steps now.",
  ],
};

const ChatBot = () => {
  const { crisisType = "other" } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [flowIndex, setFlowIndex] = useState(0);
  const [panicLevel, setPanicLevel] = useState<PanicLevel>("stressed");
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const flow = assistantFlows[crisisType] || assistantFlows.other;

  useEffect(() => {
    // Initial assistant message
    const timer = setTimeout(() => {
      setMessages([{ text: flow[0], isUser: false }]);
      setFlowIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { text: input.trim(), isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate response
    setTimeout(() => {
      if (flowIndex < flow.length) {
        setMessages((prev) => [...prev, { text: flow[flowIndex], isUser: false }]);

        // Last message → navigate to tutorial
        if (flowIndex === flow.length - 1) {
          setTimeout(() => navigate(`/tutorial/${crisisType}`), 2000);
        }
        setFlowIndex((i) => i + 1);
      }
    }, 800);

    // Simulate panic level changes
    if (panicLevel === "stressed" && messages.length > 3) setPanicLevel("calm");
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setInput("Yes, I need help");
        setIsListening(false);
      }, 1500);
    }
  };

  const isPanic = panicLevel === "panic";

  return (
    <PageWrapper className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          onClick={() => navigate("/select")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h2 className="text-sm font-semibold text-foreground">
          {crisisLabels[crisisType] || "Crisis Assistant"}
        </h2>
        <PanicIndicator level={panicLevel} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.map((m, i) => (
            <ChatBubble key={i} message={m.text} isUser={m.isUser} index={i} />
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card/50 px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button
            onClick={toggleVoice}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
              isListening
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            aria-label="Voice input"
          >
            <Mic className="h-5 w-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your response…"
            className={`flex-1 rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              isPanic ? "text-lg py-4" : ""
            }`}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ChatBot;
