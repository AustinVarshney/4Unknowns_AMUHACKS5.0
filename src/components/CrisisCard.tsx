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
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.4, 
      delay: index * 0.08,
      ease: [0.22, 0.61, 0.36, 1]
    }}
    whileHover={{ 
      scale: 1.03,
      y: -4,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card via-card to-card/80 p-5 text-left text-card-foreground shadow-lg transition-all hover:border-primary/60 hover:shadow-2xl md:gap-4 md:p-6 max-[380px]:p-4 max-[380px]:gap-2.5"
  >
    {/* Accent gradient overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-all duration-500 group-hover:opacity-100`} />
    
    {/* Subtle shine effect */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    
    {/* Bottom fade */}
    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/40 to-transparent" />
    
    {/* Emoji container with better styling */}
    <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-background via-background/90 to-background/70 text-4xl shadow-md ring-2 ring-border/60 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg max-[380px]:h-14 max-[380px]:w-14 max-[380px]:text-3xl md:h-16 md:w-16">
      {emoji}
    </div>
    
    {/* Content */}
    <div className="relative flex-1 space-y-1.5">
      <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-foreground sm:text-lg md:text-xl max-[380px]:text-sm">
        {title}
      </h3>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 transition-colors group-hover:text-muted-foreground sm:text-xs max-[380px]:text-[9px] max-[380px]:tracking-wide">
        {description}
      </p>
    </div>
    
    {/* Call to action */}
    <div className="relative mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all group-hover:gap-2.5 group-hover:text-primary max-[380px]:text-[10px] sm:text-sm">
      <span>Start guidance</span>
      <span className="text-base transition-transform group-hover:translate-x-1 max-[380px]:text-sm">→</span>
    </div>
  </motion.button>
);

export default CrisisCard;
