import { motion } from "framer-motion";

interface CrisisCardProps {
  emoji: string;
  title: string;
  description: string;
  accent: string;
  onClick: () => void;
  index?: number;
}

const CrisisCard = ({ emoji, title, description, accent, onClick, index = 0 }: CrisisCardProps) => (
  <motion.button
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.1 }}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="group relative flex w-full flex-col items-start gap-4 overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-6 text-left text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl md:p-7 max-[380px]:p-4"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent" />
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-background/80 text-4xl shadow-sm ring-1 ring-border/70 max-[380px]:h-12 max-[380px]:w-12 max-[380px]:text-3xl">
      {emoji}
    </div>
    <div className="relative space-y-2">
      <p className="text-lg font-semibold text-foreground sm:text-xl max-[380px]:text-base">{title}</p>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground max-[380px]:text-[11px] max-[380px]:tracking-[0.12em]">
        {description}
      </p>
    </div>
    <div className="relative mt-auto inline-flex items-center gap-2 text-xs font-semibold text-primary max-[380px]:text-[11px]">
      Start guidance
      <span className="text-base">→</span>
    </div>
  </motion.button>
);

export default CrisisCard;
