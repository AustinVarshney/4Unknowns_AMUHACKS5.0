import { ArrowLeft, ChevronDown, ChevronUp, Mic, Send } from "lucide-react";
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
  const [isTranslating, setIsTranslating] = useState(false);
  const [showAllPresets, setShowAllPresets] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const flow = assistantFlows[crisisType] || assistantFlows.other;

  // Translate text from Hindi to English
  const translateToEnglish = async (text: string): Promise<string> => {
    try {
      setIsTranslating(true);
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=hi|en`
      );
      const data = await response.json();
      setIsTranslating(false);
      
      if (data.responseStatus === 200 && data.responseData) {
        return data.responseData.translatedText;
      }
      return text; // Return original if translation fails
    } catch (error) {
      console.error('Translation error:', error);
      setIsTranslating(false);
      return text; // Return original if error
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'hi-IN'; // Set to Hindi

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        
        // Translate Hindi to English
        const translatedText = await translateToEnglish(transcript);
        setInput(translatedText);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsTranslating(false);
        if (event.error === 'no-speech') {
          alert('कोई आवाज़ नहीं सुनाई दी। कृपया पुनः प्रयास करें। (No speech detected. Please try again.)');
        } else if (event.error === 'not-allowed') {
          alert('माइक्रोफ़ोन की अनुमति अस्वीकृत। कृपया माइक्रोफ़ोन अनुमति दें। (Microphone access denied. Please allow microphone permissions.)');
        } else {
          alert(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

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

  const sendMessage = (messageText?: string) => {
    const trimmed = (messageText ?? input).trim();
    if (!trimmed) return;
    const userMsg: Message = { text: trimmed, isUser: true };
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


  const quickPresets = [
    "Someone unconscious",
    "Fire nearby",
    "Heavy bleeding",
    "Chest pain",
    "Difficulty breathing",
    "Severe burn",
    "Broken bone",
    "Choking",
  ];

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      // Stop listening
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Start listening
      try {
        setInput(""); // Clear input before recording
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const isPanic = panicLevel === "panic";

  return (
    <PageWrapper className="flex flex-col h-screen max-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="relative flex-shrink-0 flex items-center justify-between border-b border-border/40 bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
        <button
          onClick={() => navigate("/select")}
          className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base sm:text-lg font-semibold text-foreground tracking-tight">
          {crisisLabels[crisisType] || "Crisis Assistant"}
        </h2>
        <PanicIndicator level={panicLevel} />
      </div>

      {/* Messages - Scrollable only when overflow */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 scroll-smooth"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.03), transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.02), transparent 50%)`
        }}
      >
        <div className="mx-auto flex max-w-4xl lg:max-w-5xl flex-col gap-4 sm:gap-5 min-h-full">
          {messages.length === 0 && (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center space-y-3">
                <div className="text-4xl sm:text-5xl lg:text-6xl">💬</div>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium">Starting conversation...</p>
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <ChatBubble key={i} message={m.text} isUser={m.isUser} index={i} />
          ))}
        </div>
      </div>

      {/* Input - Fixed at bottom */}
      <div className="flex-shrink-0 relative border-t border-border/40 bg-gradient-to-b from-card/60 to-card/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {/* Quick Presets */}
        <div className="mx-auto mb-3 max-w-4xl lg:max-w-5xl">
          {/* Mobile view - scrollable or expandable */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className={`flex-1 ${showAllPresets ? 'overflow-visible' : 'overflow-x-auto scrollbar-hide'}`}>
              <div className={`flex gap-2 pb-1 ${showAllPresets ? 'flex-wrap' : ''}`}>
                {quickPresets.slice(0, showAllPresets ? quickPresets.length : 3).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => sendMessage(preset)}
                    disabled={isTranslating}
                    className="shrink-0 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-all hover:bg-accent/60 hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {preset}
                  </button>
                ))}
                {quickPresets.length > 3 && !showAllPresets && (
                  <span className="shrink-0 flex items-center px-2 text-xs text-muted-foreground">
                    +{quickPresets.length - 3} more
                  </span>
                )}
              </div>
            </div>
            {/* Expand/Collapse button */}
            <button
              onClick={() => setShowAllPresets(!showAllPresets)}
              className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/80 text-muted-foreground transition-all hover:bg-accent/60 hover:text-foreground hover:scale-110 active:scale-95"
              aria-label={showAllPresets ? "Show less" : "Show more"}
            >
              {showAllPresets ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Desktop view - all presets wrapped */}
          <div className="hidden lg:flex lg:flex-wrap lg:gap-2">
            {quickPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => sendMessage(preset)}
                disabled={isTranslating}
                className="rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-all hover:bg-accent/60 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="mx-auto flex max-w-4xl lg:max-w-5xl items-center gap-3 lg:gap-4">
          <button
            onClick={toggleVoice}
            disabled={isTranslating}
            className={`flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full shadow-lg transition-all active:scale-95 ${
              isListening
                ? "bg-gradient-to-br from-red-500 to-red-600 text-white animate-pulse ring-4 ring-red-500/30"
                : isTranslating
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white animate-pulse"
                : "bg-gradient-to-br from-slate-700 to-slate-800 text-white hover:from-slate-600 hover:to-slate-700 hover:shadow-xl hover:scale-105 disabled:opacity-40"
            }`}
            aria-label="Voice input in Hindi"
            title={isListening ? "Recording in Hindi..." : isTranslating ? "Translating..." : "Click to speak in Hindi (हिंदी में बोलें)"}
          >
            <Mic className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your response…"
              disabled={isTranslating}
              className={`w-full rounded-2xl border border-input/50 bg-background/80 backdrop-blur-sm px-5 lg:px-6 py-3.5 lg:py-4 text-sm sm:text-base lg:text-base text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent focus:shadow-md disabled:opacity-60 ${
                isPanic ? "text-base sm:text-lg lg:text-xl py-4 lg:py-5" : ""
              }`}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTranslating}
            className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            aria-label="Send"
            title="Send message"
          >
            <Send className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        </div>
        {(isListening || isTranslating) && (
          <div className="mt-3 text-center">
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground animate-pulse font-medium">
              {isListening ? "🎤 Speak Now in Hindi or English..." : "Writing ..."}
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ChatBot;
