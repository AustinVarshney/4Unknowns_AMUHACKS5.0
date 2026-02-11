import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const patterns = [
  { name: "Box Breathing", inhale: 4, hold: 4, exhale: 4, desc: "Equal intervals. Great for focus & calm." },
  { name: "4-7-8 Relaxing", inhale: 4, hold: 7, exhale: 8, desc: "Deep relaxation technique." },
  { name: "Quick Calm", inhale: 3, hold: 3, exhale: 6, desc: "Fast relief for acute stress." },
];

type Phase = "inhale" | "hold" | "exhale";

const phaseLabels: Record<Phase, string> = {
  inhale: "Breathe In",
  hold: "Hold",
  exhale: "Breathe Out",
};

const phaseColors: Record<Phase, string> = {
  inhale: "hsl(var(--calm))",
  hold: "hsl(var(--stressed))",
  exhale: "hsl(var(--primary))",
};

const BreathingExercise = () => {
  const navigate = useNavigate();
  const [patternIdx, setPatternIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [countdown, setCountdown] = useState(patterns[0].inhale);
  const [cycles, setCycles] = useState(1);

  const pattern = patterns[patternIdx];

  const phaseDuration = useCallback(
    (p: Phase) => {
      const map = { inhale: pattern.inhale, hold: pattern.hold, exhale: pattern.exhale };
      return map[p];
    },
    [pattern]
  );

  const nextPhase = useCallback(
    (current: Phase): Phase => {
      const order: Phase[] = ["inhale", "hold", "exhale"];
      const idx = order.indexOf(current);
      const next = order[(idx + 1) % 3];
      // Increment cycle when starting a new inhale
      if (next === "inhale" && current !== "inhale") {
        setCycles((c) => c + 1);
      }
      return next;
    },
    []
  );

  // Only reset when pattern changes
  useEffect(() => {
    setPhase("inhale");
    setCountdown(pattern.inhale);
    setCycles(1);
    setIsRunning(false);
    setHasStarted(false);
  }, [patternIdx, pattern.inhale]);

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
    setHasStarted(false);
    setPhase("inhale");
    setCountdown(pattern.inhale);
    setCycles(1);
  };

  return (
    <PageWrapper className="flex min-h-screen flex-col px-4 py-2 sm:px-6 sm:py-3 lg:h-screen lg:overflow-auto lg:px-8 lg:py-3">
      <button
        onClick={() => navigate("/")}
        className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-3"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-2 pb-4">
        <div className="w-full text-center">
          <h1 className="mb-1 text-2xl font-bold text-foreground sm:text-3xl lg:text-3xl">Breathing Exercise</h1>
          <p className="mb-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm lg:text-sm">Calm your body and mind with guided breathing.</p>

          {/* Pattern selector */}
          <div className="mb-2 flex flex-wrap justify-center gap-1.5 sm:mb-3 sm:gap-2 lg:gap-2">
            {patterns.map((p, i) => (
              <button
                key={p.name}
                onClick={() => { setPatternIdx(i); reset(); }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:scale-105 sm:px-4 sm:py-2 sm:text-sm lg:px-5 lg:py-2 lg:text-sm ${
                  i === patternIdx
                    ? "border-primary bg-primary/10 text-primary shadow-md"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:shadow-sm"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <p className="mb-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm lg:text-sm">{pattern.desc}</p>
        </div>

        {/* Breathing circle - now in a card container */}
        <div className="relative mb-2 w-full sm:mb-3 lg:mb-3">
          <div className="mx-auto w-fit rounded-3xl bg-gradient-to-br from-background to-secondary/20 p-3 shadow-lg sm:p-4 lg:p-6">
            <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52 lg:h-64 lg:w-64">
              <motion.div
                animate={{ scale: isRunning ? circleScale : 1 }}
                transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
                className="absolute h-32 w-32 rounded-full opacity-20 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                style={{ backgroundColor: phaseColors[phase] }}
              />
              <motion.div
                animate={{ scale: isRunning ? circleScale : 1 }}
                transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
                className="absolute h-22 w-22 rounded-full opacity-40 sm:h-26 sm:w-26 lg:h-36 lg:w-36"
                style={{ backgroundColor: phaseColors[phase] }}
              />
              <motion.div
                animate={{ scale: isRunning ? circleScale : 1 }}
                transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl sm:h-18 sm:w-18 lg:h-28 lg:w-28"
                style={{ backgroundColor: phaseColors[phase] }}
              >
                <span className="text-xl font-bold text-primary-foreground tabular-nums sm:text-2xl lg:text-3xl">
                  {hasStarted ? countdown : "—"}
                </span>
              </motion.div>
            </div>

            {/* Phase label and cycles inside the card */}
            <div className="mt-2 sm:mt-3 lg:mt-3">
              <AnimatePresence mode="wait">
                {isRunning ? (
                  <motion.p
                    key={phase}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-base font-semibold text-foreground sm:text-lg lg:text-xl"
                  >
                    {phaseLabels[phase]}
                  </motion.p>
                ) : (
                  <p className="text-base font-semibold text-muted-foreground sm:text-lg lg:text-xl">
                    {hasStarted ? "Paused" : "Ready to Begin"}
                  </p>
                )}
              </AnimatePresence>

              {isRunning && (
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm lg:text-sm">
                  Cycle {cycles}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!hasStarted) setHasStarted(true);
              setIsRunning((prev) => !prev);
            }}
            className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 sm:px-8 sm:py-3 lg:px-8 lg:py-3 lg:text-base"
          >
            {isRunning ? (
              <Pause className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />
            ) : (
              <Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />
            )}
            {isRunning ? "Pause" : hasStarted ? "Resume" : "Start"}
          </motion.button>
          {isRunning && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md transition-colors hover:bg-secondary/80 sm:h-12 sm:w-12 lg:h-12 lg:w-12"
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
