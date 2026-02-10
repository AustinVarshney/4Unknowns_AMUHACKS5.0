import { motion } from "framer-motion";

interface CrisisCardProps {
  emoji: string;
  title: string;
  onClick: () => void;
  index?: number;
}

const CrisisCard = ({ emoji, title, onClick, index = 0 }: CrisisCardProps) => (
  <motion.button
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.1 }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="flex w-full flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-card/80 md:p-10"
  >
    <span className="text-5xl">{emoji}</span>
    <span className="text-lg font-semibold">{title}</span>
  </motion.button>
);

export default CrisisCard;
