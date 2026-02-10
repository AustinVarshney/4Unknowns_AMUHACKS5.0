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
    <PageWrapper className="flex flex-col px-6 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <div className="mx-auto w-full max-w-md text-center">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Breathing Exercise</h1>
        <p className="mb-8 text-muted-foreground">Calm your body and mind with guided breathing.</p>

        {/* Pattern selector */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {patterns.map((p, i) => (
            <button
              key={p.name}
              onClick={() => { setPatternIdx(i); reset(); }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                i === patternIdx
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">{pattern.desc}</p>

        {/* Breathing circle */}
        <div className="relative mx-auto mb-8 flex h-64 w-64 items-center justify-center">
          <motion.div
            animate={{ scale: isRunning ? circleScale : 1 }}
            transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
            className="absolute h-48 w-48 rounded-full opacity-20"
            style={{ backgroundColor: phaseColors[phase] }}
          />
          <motion.div
            animate={{ scale: isRunning ? circleScale : 1 }}
            transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
            className="absolute h-36 w-36 rounded-full opacity-40"
            style={{ backgroundColor: phaseColors[phase] }}
          />
          <motion.div
            animate={{ scale: isRunning ? circleScale : 1 }}
            transition={{ duration: phaseDuration(phase), ease: "easeInOut" }}
            className="flex h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: phaseColors[phase] }}
          >
            <span className="text-lg font-bold text-primary-foreground tabular-nums">
              {isRunning ? countdown : "—"}
            </span>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {isRunning && (
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-2 text-xl font-semibold text-foreground"
            >
              {phaseLabels[phase]}
            </motion.p>
          )}
        </AnimatePresence>

        {isRunning && (
          <p className="mb-8 text-sm text-muted-foreground">Cycles completed: {cycles}</p>
        )}

        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {isRunning ? "Pause" : "Start"}
          </motion.button>
          {isRunning && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <RotateCcw className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default BreathingExercise;
