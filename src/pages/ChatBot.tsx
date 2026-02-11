import { ArrowLeft, ChevronDown, ChevronUp, ChevronRight, Mic, Send, Volume2 } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "../components/ChatBubble";
import PageWrapper from "../components/PageWrapper";
import PanicIndicator, { type PanicLevel } from "../components/PanicIndicator";
import TimerComponent from "../components/TimerComponent";
import { medicalAPI, normalizeImmediateActions, type AssessmentResponse } from "../lib/api";

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
  const [isLocating, setIsLocating] = useState(false);
  const [locationLabel, setLocationLabel] = useState("Location not shared");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showAllPresets, setShowAllPresets] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [assessmentData, setAssessmentData] = useState<AssessmentResponse | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timerDone, setTimerDone] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const flow = assistantFlows[crisisType] || assistantFlows.other;

  const handleTimerComplete = useCallback(() => setTimerDone(true), []);

  const nextStep = () => {
    if (!assessmentData?.immediate_actions) return;
    
    const isLast = currentStep === assessmentData.immediate_actions.length - 1;
    if (isLast) {
      // Don't close tutorial yet, show emergency contact options
      setShowEmergencyContacts(true);
    } else {
      setCurrentStep((s) => s + 1);
      setTimerDone(false);
    }
  };

  const handleEverythingOk = () => {
    setShowTutorial(false);
    setShowEmergencyContacts(false);
    setCurrentStep(0);
  };

  const handleNeedHelp = () => {
    // Show emergency contacts or navigate to emergency page
    if (assessmentData?.escalation_required) {
      navigate('/emergency');
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

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

  const sendMessage = async (messageText?: string) => {
    const trimmed = (messageText ?? input).trim();
    if (!trimmed || isLoadingResponse) return;
    
    const userMsg: Message = { text: trimmed, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoadingResponse(true);

    try {
      // Call the backend API
      const response = await medicalAPI.getAssessment({
        user_input: trimmed,
        session_id: sessionId,
      });

      // Normalize immediate actions to handle different backend formats
      if (response.immediate_actions) {
        response.immediate_actions = normalizeImmediateActions(response.immediate_actions);
        console.log('Normalized immediate actions:', response.immediate_actions);
      }

      // Store the assessment data
      setAssessmentData(response);

      // Update panic level based on severity
      if (response.severity_level === 'critical') {
        setPanicLevel('panic');
      } else if (response.severity_level === 'high') {
        setPanicLevel('stressed');
      } else {
        setPanicLevel('calm');
      }

      // Create response message - only show reassurance and assessment
      const responseMessages: string[] = [];
      
      // Add reassurance message with emoji
      if (response.reassurance_message) {
        responseMessages.push(`💙 ${response.reassurance_message}`);
      }

      // Add assessment with clear title
      if (response.assessment) {
        responseMessages.push(`📋 Assessment:\n\n${response.assessment}`);
      }

      // Add severity info
      const severityEmoji = response.severity_level === 'critical' ? '🚨' : 
                           response.severity_level === 'high' ? '⚠️' : 
                           response.severity_level === 'moderate' ? '🟡' : '🟢';
      responseMessages.push(`${severityEmoji} Severity: ${response.severity_level.toUpperCase()} | Crisis Type: ${response.crisis_type}`);

      // FOR TESTING: Add full JSON output
      responseMessages.push(`🔍 DEBUG - Full JSON Response:\n\n${JSON.stringify(response, null, 2)}`);

      // Add all response messages
      for (let i = 0; i < responseMessages.length; i++) {
        setTimeout(() => {
          setMessages((prev) => [...prev, { text: responseMessages[i], isUser: false }]);
        }, i * 600);
      }

      // If critical emergency, add a button to navigate to emergency page
      if (response.escalation_required) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: "🚨 This appears to be a critical emergency. Would you like to see emergency escalation options?",
              isUser: false,
            },
          ]);
        }, responseMessages.length * 600 + 1000);
      }

    } catch (error) {
      console.error('Error getting assessment:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I apologize, but I'm having trouble connecting to the medical assistant. Please ensure you're connected to the internet and try again. In case of emergency, call 911 immediately.",
          isUser: false,
        },
      ]);
      setPanicLevel('stressed');
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1&accept-language=en`
      );
      if (!response.ok) return null;
      const data = await response.json();
      const address = data?.address ?? {};
      const locality =
        address.neighbourhood ||
        address.suburb ||
        address.village ||
        address.town ||
        address.city ||
        address.county ||
        address.state_district ||
        address.state;
      const region = address.state || address.country;
      if (locality && region && locality !== region) return `${locality}, ${region}`;
      return locality || region || data?.display_name || null;
    } catch {
      return null;
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location is not supported in this browser.");
      setLocationLabel("Location unavailable");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const fallbackLabel = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setLocationLabel(fallbackLabel);
        reverseGeocode(latitude, longitude).then((placeLabel) => {
          if (placeLabel) setLocationLabel(placeLabel);
        });
        setIsLocating(false);
      },
      (error) => {
        setLocationError(error.message || "Unable to retrieve location.");
        setLocationLabel("Location unavailable");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
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

  // If tutorial mode is active, show the tutorial overlay
  if (showTutorial && assessmentData?.immediate_actions && assessmentData.immediate_actions.length > 0) {
    console.log('Tutorial mode active');
    console.log('Assessment data:', assessmentData);
    console.log('Immediate actions:', assessmentData.immediate_actions);
    
    const sortedActions = [...assessmentData.immediate_actions].sort((a, b) => a.order - b.order);
    console.log('Sorted actions:', sortedActions);
    
    // Safety check for current step
    if (currentStep >= sortedActions.length) {
      console.error('Current step exceeds array length, resetting');
      setCurrentStep(0);
      return null;
    }
    
    const step = sortedActions[currentStep];
    console.log('Current step:', currentStep, 'Step data:', step);
    
    if (!step) {
      console.error('Step is null/undefined');
      return null;
    }
    
    const isLast = currentStep === sortedActions.length - 1;
    
    // Estimate timer seconds based on action text length (default 15 seconds)
    const estimatedSeconds = Math.max(15, Math.min(60, Math.ceil((step.action?.length || 100) / 8)));

    // If showing emergency contacts at the end
    if (showEmergencyContacts && isLast) {
      return (
        <PageWrapper className="flex flex-col h-screen max-h-screen overflow-hidden px-6 py-8 bg-gradient-to-br from-background via-background to-muted/20">
          <button
            onClick={() => {
              setShowEmergencyContacts(false);
              setShowTutorial(false);
              setCurrentStep(0);
            }}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to chat
          </button>

          <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full rounded-2xl border border-border bg-card p-8 text-center"
            >
              <div className="mb-6 text-5xl">🏥</div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Is Everything Under Control?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Let us know if you need further assistance
              </p>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEverythingOk}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-600"
                >
                  ✅ Yes, Everything is OK
                </motion.button>

                {assessmentData?.who_to_contact && assessmentData.who_to_contact.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">
                      Need help? Contact:
                    </p>
                    <div className="space-y-2">
                      {assessmentData.who_to_contact.map((contact, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleNeedHelp}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-red-600"
                        >
                          🚨 Call {contact}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {assessmentData?.escalation_required && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNeedHelp}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-red-600"
                  >
                    🚨 No, Get Emergency Help
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </PageWrapper>
      );
    }

    return (
      <PageWrapper className="flex flex-col h-screen max-h-screen overflow-hidden px-6 py-8 bg-gradient-to-br from-background via-background to-muted/20">
        <button
          onClick={() => setShowTutorial(false)}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to chat
        </button>

        <div className="mb-4 text-center">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {sortedActions.length}
          </span>
          {/* Progress bar */}
          <div className="mx-auto mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / sortedActions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-2xl border border-border bg-card p-8 text-center"
            >
              {step.is_critical && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600">
                  🚨 CRITICAL ACTION
                </div>
              )}
              
              {/* Title */}
              {step.title && (
                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  {step.title}
                </h3>
              )}
              
              {/* Instruction */}
              <p className="text-lg font-medium leading-relaxed text-card-foreground md:text-xl">
                {step.action}
              </p>

              <button
                onClick={() => speakText(step.action)}
                className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <Volume2 className="h-4 w-4" /> Read Aloud
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Show timer only if duration_seconds is not null */}
          {step.duration_seconds !== null && step.duration_seconds !== undefined && !timerDone && (
            <TimerComponent
              key={currentStep}
              seconds={step.duration_seconds}
              onComplete={handleTimerComplete}
              label="Complete this step"
            />
          )}

          {/* Show Next Step button if: no timer (duration_seconds is null) OR timer is done */}
          {((step.duration_seconds === null || step.duration_seconds === undefined) || timerDone) && (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={nextStep}
              className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            >
              {isLast ? "Check Status" : "Next Step"} <ChevronRight className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </PageWrapper>
    );
  }

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

      {/* Location awareness (UI-only) */}
      <div className="flex-shrink-0 border-b border-border/30 bg-card/60 px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto flex max-w-4xl lg:max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center rounded-full bg-accent/50 px-2.5 py-1 text-foreground">
              📍 Location
            </span>
            <span className="font-medium text-foreground">
              {isLocating ? "Locating..." : locationLabel}
            </span>
            {locationError && (
              <span className="text-xs text-destructive/80">({locationError})</span>
            )}
          </div>
          <button
            onClick={requestLocation}
            className="inline-flex items-center justify-center rounded-lg border border-border/50 bg-background/70 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-all hover:bg-accent/60"
          >
            {isLocating ? "Fetching..." : "Get Location"}
          </button>
        </div>
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
          
          {/* Start Tutorial Button */}
          {assessmentData && assessmentData.immediate_actions && assessmentData.immediate_actions.length > 0 && !showTutorial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              {/* Debug info */}
              <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                ✅ Found {assessmentData.immediate_actions.length} actions in response
              </div>
              
              <button
                onClick={() => {
                  console.log('Starting tutorial with data:', assessmentData);
                  console.log('Immediate actions:', assessmentData.immediate_actions);
                  setShowTutorial(true);
                  setCurrentStep(0);
                  setTimerDone(false);
                }}
                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    Start Step-by-Step Tutorial
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="text-xs font-normal text-primary-foreground/80">
                    {assessmentData.immediate_actions.length} actions to follow
                  </div>
                </div>
              </button>
            </motion.div>
          )}
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
                    disabled={isTranslating || isLoadingResponse}
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
                disabled={isTranslating || isLoadingResponse}
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
            disabled={isTranslating || isLoadingResponse}
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
              placeholder={isLoadingResponse ? "Getting AI response..." : "Type your response…"}
              disabled={isTranslating || isLoadingResponse}
              className={`w-full rounded-2xl border border-input/50 bg-background/80 backdrop-blur-sm px-5 lg:px-6 py-3.5 lg:py-4 text-sm sm:text-base lg:text-base text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent focus:shadow-md disabled:opacity-60 ${
                isPanic ? "text-base sm:text-lg lg:text-xl py-4 lg:py-5" : ""
              }`}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTranslating || isLoadingResponse}
            className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            aria-label="Send"
            title="Send message"
          >
            <Send className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        </div>
        {(isListening || isTranslating || isLoadingResponse) && (
          <div className="mt-3 text-center">
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground animate-pulse font-medium">
              {isListening ? "🎤 Speak Now in Hindi or English..." : isTranslating ? "🔄 Translating..." : "🤖 AI is analyzing your situation..."}
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ChatBot;
