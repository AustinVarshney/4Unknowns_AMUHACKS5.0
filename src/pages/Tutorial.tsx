import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import TimerComponent from "../components/TimerComponent";
import { ArrowLeft, Volume2, ChevronRight } from "lucide-react";

interface Step {
  instruction: string;
  timerSeconds?: number;
  audio?: string;
}

const tutorialSteps: Record<string, Step[]> = {
  medical: [
    { instruction: "Check if the person is responsive. Gently tap their shoulder and ask loudly: 'Are you okay?'", timerSeconds: 10 },
    { instruction: "If unresponsive, call emergency services immediately. Tilt the head back gently to open the airway.", timerSeconds: 15 },
    { instruction: "Check for breathing for 10 seconds. Look at the chest, listen, and feel for breaths.", timerSeconds: 10 },
    { instruction: "If not breathing, begin chest compressions. Push hard and fast in the center of the chest, 30 compressions.", timerSeconds: 30 },
    { instruction: "Give 2 rescue breaths if trained. Then continue 30 compressions and 2 breaths.", timerSeconds: 60 },
  ],
  fire: [
    { instruction: "Alert everyone in the area. Shout 'FIRE!' and activate fire alarms if available.", timerSeconds: 10 },
    { instruction: "Get low to the ground. Smoke rises, so crawl to avoid inhaling toxic fumes.", timerSeconds: 15 },
    { instruction: "Feel doors before opening. If hot, do NOT open — find another exit route.", timerSeconds: 10 },
    { instruction: "Exit the building using stairs only. Never use elevators during a fire.", timerSeconds: 30 },
    { instruction: "Once outside, move to a safe distance and call emergency services. Do not re-enter.", timerSeconds: 15 },
  ],
  safety: [
    { instruction: "Assess your surroundings. Identify exits and any nearby people who could help.", timerSeconds: 15 },
    { instruction: "If possible, remove yourself from the threatening situation quietly and calmly.", timerSeconds: 20 },
    { instruction: "Move to a public, well-lit area with other people around.", timerSeconds: 30 },
    { instruction: "Call someone you trust — a friend, family member, or emergency services.", timerSeconds: 15 },
    { instruction: "Stay in a safe location until help arrives. Do not return to the dangerous area.", timerSeconds: 30 },
  ],
  other: [
    { instruction: "Take a deep breath. Breathe in for 4 seconds, hold for 4, breathe out for 4.", timerSeconds: 12 },
    { instruction: "Assess the situation calmly. What is the immediate risk?", timerSeconds: 15 },
    { instruction: "If anyone is in danger, call emergency services immediately.", timerSeconds: 10 },
    { instruction: "Follow any safety instructions from authorities or trained personnel.", timerSeconds: 20 },
    { instruction: "Stay in a safe location and wait for the situation to resolve.", timerSeconds: 30 },
  ],
};

const Tutorial = () => {
  const { crisisType = "other" } = useParams();
  const navigate = useNavigate();
  const steps = tutorialSteps[crisisType] || tutorialSteps.other;
  const [currentStep, setCurrentStep] = useState(0);
  const [timerDone, setTimerDone] = useState(false);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleTimerComplete = useCallback(() => setTimerDone(true), []);

  const nextStep = () => {
    if (isLast) {
      navigate("/evaluate");
    } else {
      setCurrentStep((s) => s + 1);
      setTimerDone(false);
    }
  };

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(step.instruction);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <PageWrapper className="flex flex-col px-6 py-8">
      <button
        onClick={() => navigate(`/chat/${crisisType}`)}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to chat
      </button>

      <div className="mb-4 text-center">
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
        {/* Progress bar */}
        <div className="mx-auto mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
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
            <p className="text-lg font-medium leading-relaxed text-card-foreground md:text-xl">
              {step.instruction}
            </p>

            <button
              onClick={speakText}
              className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <Volume2 className="h-4 w-4" /> Read Aloud
            </button>
          </motion.div>
        </AnimatePresence>

        {step.timerSeconds && !timerDone && (
          <TimerComponent
            key={currentStep}
            seconds={step.timerSeconds}
            onComplete={handleTimerComplete}
            label="Complete this step"
          />
        )}

        {(timerDone || !step.timerSeconds) && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={nextStep}
            className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            {isLast ? "Evaluate Situation" : "Next Step"} <ChevronRight className="h-5 w-5" />
          </motion.button>
        )}
      </div>
    </PageWrapper>
  );
};

export default Tutorial;