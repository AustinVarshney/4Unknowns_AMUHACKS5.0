import { motion } from "framer-motion";

export type PanicLevel = "calm" | "stressed" | "panic";

interface PanicIndicatorProps {
  level: PanicLevel;
}

const config = {
  calm: { label: "Calm", emoji: "🟢", color: "bg-calm" },
  stressed: { label: "Stressed", emoji: "🟡", color: "bg-stressed" },
  panic: { label: "Panic", emoji: "🔴", color: "bg-panic" },
};

const PanicIndicator = ({ level }: PanicIndicatorProps) => {
  const { label, emoji, color } = config[level];

  return (
    <motion.div
      layout
      className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
    >
      <span className="text-lg">{emoji}</span>
      <div className={`h-2.5 w-2.5 rounded-full ${color} ${level === "panic" ? "animate-pulse" : ""}`} />
      <span className="text-sm font-medium text-card-foreground">{label}</span>
    </motion.div>
  );
};

export default PanicIndicator;
