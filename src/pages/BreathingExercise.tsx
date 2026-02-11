import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const patterns = [
  { name: "Box Breathing", inhale: 4, hold1: 4, exhale: 4, hold2: 4, desc: "Equal intervals. Great for focus & calm." },
  { name: "4-7-8 Relaxing", inhale: 4, hold1: 7, exhale: 8, hold2: 0, desc: "Deep relaxation technique." },
  { name: "Quick Calm", inhale: 3, hold1: 3, exhale: 6, hold2: 0, desc: "Fast relief for acute stress." },
];

type Phase = "inhale" | "hold1" | "exhale" | "hold2";

const phaseLabels: Record<Phase, string> = {
  inhale: "Breathe In",
  hold1: "Hold",
  exhale: "Breathe Out",
  hold2: "Hold",
};

const phaseColors: Record<Phase, string> = {
  inhale: "hsl(var(--calm))",
  hold1: "hsl(var(--stressed))",
  exhale: "hsl(var(--primary))",
  hold2: "hsl(var(--muted-foreground))",
};

const BreathingExercise = () => {
  const navigate = useNavigate();
  const [patternIdx, setPatternIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);

  const pattern = patterns[patternIdx];

  const phaseDuration = useCallback(
    (p: Phase) => {
      const map = { inhale: pattern.inhale, hold1: pattern.hold1, exhale: pattern.exhale, hold2: pattern.hold2 };
      return map[p];
    },
    [pattern]
  );

  const nextPhase = useCallback(
    (current: Phase): Phase => {
      const order: Phase[] = ["inhale", "hold1", "exhale", "hold2"];
      const idx = order.indexOf(current);
      for (let i = 1; i <= 4; i++) {
        const next = order[(idx + i) % 4];
        if (phaseDuration(next) > 0) {
          if (next === "inhale" && current !== "inhale") setCycles((c) => c + 1);
          return next;
        }
      }
      return "inhale";
    },
    [phaseDuration]
  );

  useEffect(() => {
    if (!isRunning) return;
    setPhase("inhale");
    setCountdown(pattern.inhale);
    setCycles(0);
  }, [isRunning, patternIdx]);

  useEffect(() => {
    if (!isRunning) return;
    if (countdown <= 0) {
      const np = nextPhase(phase);
      setPhase(np);
      setCountdown(phaseDuration(np));
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [isRunning, countdown, phase, nextPhase, phaseDuration]);

  const circleScale = phase === "inhale" ? 1.4 : phase === "exhale" ? 0.7 : 1;

  const reset = () => {
    setIsRunning(false);
    setPhase("inhale");
    setCountdown(0);
    setCycles(0);
  };

  return (
    <PageWrapper className="flex min-h-screen flex-col px-4 py-3 sm:px-6 sm:py-4 lg:h-screen lg:overflow-hidden lg:px-12 lg:py-4">
      <button
        onClick={() => navigate("/")}
        className="mb-3 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-4 lg:mb-3"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center lg:gap-1">
        <div className="w-full text-center">
          <h1 className="mb-1 text-2xl font-bold text-foreground sm:text-3xl lg:mb-1 lg:text-4xl">Breathing Exercise</h1>
          <p className="mb-3 text-xs text-muted-foreground sm:mb-4 sm:text-sm lg:mb-3 lg:text-base">Calm your body and mind with guided breathing.</p>

          {/* Pattern selector */}
          <div className="mb-3 flex flex-wrap justify-center gap-1.5 sm:mb-4 sm:gap-2 lg:mb-3 lg:gap-3">
            {patterns.map((p, i) => (
              <button
                key={p.name}
                onClick={() => { setPatternIdx(i); reset(); }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:scale-105 sm:px-4 sm:py-2 sm:text-sm lg:px-6 lg:py-2.5 lg:text-base ${
                  i === patternIdx
                    ? "border-primary bg-primary/10 text-primary shadow-md"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:shadow-sm"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <p className="mb-3 text-xs text-muted-foreground sm:mb-4 sm:text-sm lg:mb-3 lg:text-base">{pattern.desc}</p>
        </div>

        {/* Breathing circle - now in a card container */}
        <div className="relative mb-3 w-full sm:mb-4 lg:mb-3">
          <div className="mx-auto w-fit rounded-3xl bg-gradient-to-br from-background to-secondary/20 p-4 shadow-lg sm:p-6 lg:p-10">
            <div className="relative mx-auto flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56 lg:h-80 lg:w-80">
              <motion.div
                animate={{ scale: isRunning ? circleScale : 1 }}
                transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
                className="absolute h-36 w-36 rounded-full opacity-20 sm:h-44 sm:w-44 lg:h-60 lg:w-60"
                style={{ backgroundColor: phaseColors[phase] }}
              />
              <motion.div
                animate={{ scale: isRunning ? circleScale : 1 }}
                transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
                className="absolute h-24 w-24 rounded-full opacity-40 sm:h-28 sm:w-28 lg:h-44 lg:w-44"
                style={{ backgroundColor: phaseColors[phase] }}
              />
              <motion.div
                animate={{ scale: isRunning ? circleScale : 1 }}
                transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl sm:h-20 sm:w-20 lg:h-32 lg:w-32"
                style={{ backgroundColor: phaseColors[phase] }}
              >
                <span className="text-xl font-bold text-primary-foreground tabular-nums sm:text-2xl lg:text-4xl">
                  {isRunning ? countdown : "—"}
                </span>
              </motion.div>
            </div>

            {/* Phase label and cycles inside the card */}
            <div className="mt-3 sm:mt-4 lg:mt-5">
              <AnimatePresence mode="wait">
                {isRunning ? (
                  <motion.p
                    key={phase}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-base font-semibold text-foreground sm:text-lg lg:text-2xl"
                  >
                    {phaseLabels[phase]}
                  </motion.p>
                ) : (
                  <p className="text-base font-semibold text-muted-foreground sm:text-lg lg:text-2xl">Ready to Begin</p>
                )}
              </AnimatePresence>

              {isRunning && (
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm lg:text-base">
                  {cycles} {cycles === 1 ? 'cycle' : 'cycles'} completed
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 lg:text-lg"
          >
            {isRunning ? <Pause className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />}
            {isRunning ? "Pause" : "Start"}
          </motion.button>
          {isRunning && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md transition-colors hover:bg-secondary/80 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
            >
              <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />
            </motion.button>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default BreathingExercise;
