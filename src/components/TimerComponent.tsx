import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface TimerComponentProps {
  seconds: number;
  onComplete: () => void;
  label?: string;
}

const TimerComponent = ({ seconds, onComplete, label }: TimerComponentProps) => {
  const [remaining, setRemaining] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, remaining, onComplete]);

  const progress = ((seconds - remaining) / seconds) * 100;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="flex flex-col items-center gap-4">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={283}
            strokeDashoffset={283 - (283 * progress) / 100}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <span className="text-2xl font-bold text-foreground tabular-nums">
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      {!isRunning && remaining === seconds && (
        <button
          onClick={() => setIsRunning(true)}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Start Timer
        </button>
      )}
      {isRunning && (
        <p className="text-xs text-muted-foreground animate-pulse">Timer running…</p>
      )}
    </div>
  );
};

export default TimerComponent;