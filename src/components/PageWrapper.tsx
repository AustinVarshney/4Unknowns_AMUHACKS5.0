import { motion } from "framer-motion";
import { type ReactNode, useEffect, useMemo, useState } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const OFFLINE_QUESTION_SECTIONS = [
  {
    label: "Medical",
    description: "Immediate safety and urgent care.",
    questions: [
      {
        prompt: "Is anyone having trouble breathing, bleeding heavily, or unconscious?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        prompt: "Do you need emergency services right now?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        prompt: "What symptoms started first?",
        options: ["Pain", "Breathing", "Bleeding", "Other"],
      },
      {
        prompt: "Is there a safe place to sit or lie down?",
        options: ["Yes", "No", "Looking"],
      },
      {
        prompt: "Is someone nearby who can help you right now?",
        options: ["Yes", "No", "Maybe"],
      },
    ],
  },
  {
    label: "Financial",
    description: "Stabilize money stress and next actions.",
    questions: [
      {
        prompt: "What is the most urgent money issue today?",
        options: ["Bill", "Rent", "Debt", "Other"],
      },
      {
        prompt: "Is there a deadline in the next 24 hours?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        prompt: "What amount must be covered immediately?",
        options: ["Small", "Medium", "Large", "Not sure"],
      },
      {
        prompt: "Can you contact someone for support?",
        options: ["Yes", "No", "Maybe"],
      },
      {
        prompt: "What is one small action that reduces pressure?",
        options: ["Call", "Plan", "Pause", "Other"],
      },
    ],
  },
  {
    label: "Family",
    description: "Communication, safety, and support.",
    questions: [
      {
        prompt: "Is anyone unsafe or in immediate danger?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        prompt: "What is the main issue right now?",
        options: ["Argument", "Safety", "Support", "Other"],
      },
      {
        prompt: "Who is the calmest person to contact first?",
        options: ["Parent", "Sibling", "Friend", "Other"],
      },
      {
        prompt: "What boundary or request helps in the next hour?",
        options: ["Space", "Time", "Help", "Other"],
      },
      {
        prompt: "Where can you step away to breathe for 2 minutes?",
        options: ["Room", "Outside", "Bathroom", "Other"],
      },
    ],
  },
  {
    label: "Personal",
    description: "Self-care and grounding in a crisis.",
    questions: [
      {
        prompt: "Are you safe where you are right now?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        prompt: "What feels strongest right now?",
        options: ["Fear", "Anger", "Sadness", "Other"],
      },
      {
        prompt: "What do you need most right now?",
        options: ["Water", "Rest", "Space", "Support"],
      },
      {
        prompt: "Would a grounding exercise help?",
        options: ["Yes", "No", "Maybe"],
      },
      {
        prompt: "Who could you reach out to when back online?",
        options: ["Friend", "Family", "Counselor", "Other"],
      },
    ],
  },
];

const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
  const [isOffline, setIsOffline] = useState(() =>
    typeof navigator === "undefined" ? false : !navigator.onLine
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOffline) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOffline]);


  const activeSection = useMemo(
    () => OFFLINE_QUESTION_SECTIONS.find((section) => section.label === selectedCategory) ?? null,
    [selectedCategory]
  );

  const activeQuestion = activeSection?.questions[currentQuestionIndex];
  const totalQuestions = activeSection?.questions.length ?? 0;

  const questionKey = activeSection
    ? `${activeSection.label}-${currentQuestionIndex}`
    : null;

  const selectedAnswer = questionKey ? answers[questionKey] : undefined;

  const offlineSummary = useMemo(() => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount === 0) return "Pick a category to begin.";
    return `${answeredCount} answer${answeredCount === 1 ? "" : "s"} saved offline.`;
  }, [answers]);

  const handleAnswerSelect = (value: string) => {
    if (!questionKey) return;
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
  };

  const handleNext = () => {
    if (!activeSection) return;
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, activeSection.questions.length - 1));
  };

  const handleBack = () => {
    if (!activeSection) return;
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCategorySelect = (label: string) => {
    setSelectedCategory(label);
    setCurrentQuestionIndex(0);
  };

  const handleResetCategory = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
  };

  const handleDone = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`min-h-screen ${className}`}
    >
      {children}
      {isOffline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden px-4 py-6"
          aria-live="polite"
          aria-label="Offline crisis helper"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />
          <div className="absolute inset-0 hero-grid opacity-60" />
          <div className="absolute -top-32 right-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 left-8 h-72 w-72 rounded-full bg-destructive/10 blur-3xl" />

          <div className="relative w-full max-w-3xl">
            <div className="glass-panel max-h-[85vh] overflow-y-auto rounded-[2rem] p-6 shadow-2xl md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
                    Connection lost
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">
                    You are offline
                  </h1>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Stay here. These quick questions help you focus and decide the next step while
                    we are offline.
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
                  Offline mode active
                </div>
              </div>

              {!activeSection ? (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {OFFLINE_QUESTION_SECTIONS.map((section) => (
                    <button
                      key={section.label}
                      type="button"
                      onClick={() => handleCategorySelect(section.label)}
                      className="group rounded-3xl border border-border/80 bg-card/80 p-6 text-left transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
                        {section.label}
                      </p>
                      <h2 className="mt-3 text-xl font-semibold text-foreground">
                        {section.description}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Tap to answer 5 guided questions.
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Start now
                        <span className="text-lg">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                        {activeSection.label}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-foreground">
                        {activeSection.description}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetCategory}
                      className="text-sm font-semibold text-primary"
                    >
                      Change category
                    </button>
                  </div>

                  <div className="mt-6 rounded-3xl border border-border/80 bg-card/80 p-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                      <span>{offlineSummary}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {activeQuestion?.prompt}
                    </h3>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {activeQuestion?.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleAnswerSelect(option)}
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                            selectedAnswer === option
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border/80 bg-background"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentQuestionIndex === 0}
                        className="rounded-full border border-border/80 px-4 py-2 text-sm font-semibold text-foreground transition disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Back
                      </button>
                      {currentQuestionIndex >= totalQuestions - 1 ? (
                        <button
                          type="button"
                          onClick={handleDone}
                          className="rounded-full border border-primary/40 bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition"
                        >
                          Done
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-muted/40 px-5 py-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                    Quick grounding
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Inhale 4 seconds, hold 4, exhale 6. Repeat twice.
                  </p>
                </div>
                <div className="text-sm font-semibold text-primary">{offlineSummary}</div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Your taps stay on this device until you are back online.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PageWrapper;
