import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CrisisCard from "../components/CrisisCard";
import PageWrapper from "../components/PageWrapper";

const crises = [
  {
    emoji: "🏥",
    title: "Medical Emergency",
    description: "Breathing, injuries, urgent care",
    type: "medical",
    accent: "from-calm/20 via-transparent to-transparent",
  },
  {
    emoji: "🔥",
    title: "Fire Emergency",
    description: "Smoke, heat, evacuation steps",
    type: "fire",
    accent: "from-panic/25 via-transparent to-transparent",
  },
  {
    emoji: "💰",
    title: "Financial Crisis",
    description: "Money troubles, debt, financial help",
    type: "financial",
    accent: "from-green-500/20 via-transparent to-transparent",
  },
  {
    emoji: "⚠️",
    title: "Other Crisis",
    description: "Unclear, complex, or mixed",
    type: "other",
    accent: "from-primary/20 via-transparent to-transparent",
  },
];

const CrisisSelection = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="relative flex min-h-screen flex-col overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:h-screen lg:px-12 lg:py-10 max-[380px]:px-3 max-[380px]:py-5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.35),_transparent_70%)] blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--calm)/0.35),_transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 hero-grid opacity-60" />
      </div>

      <button
        onClick={() => navigate("/")}
        className="relative z-10 mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-foreground lg:mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center lg:mb-12"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Choose your path
          </p>
          <h1 className="mb-4 text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl max-[380px]:text-2xl">
            What kind of situation are you facing?
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base lg:text-lg max-[380px]:text-xs">
            Select the type of emergency for focused, step-by-step help.
          </p>
        </motion.div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 xl:gap-5">
          {crises.map((c, i) => (
            <CrisisCard
              key={c.type}
              emoji={c.emoji}
              title={c.title}
              description={c.description}
              accent={c.accent}
              index={i}
              onClick={() => navigate(`/chat/${c.type}`)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs text-muted-foreground sm:text-sm lg:mt-10 lg:text-base max-[380px]:text-[11px]"
        >
          💡 Not sure which to choose? Select "Other Crisis" for general guidance.
        </motion.p>
      </div>
    </PageWrapper>
  );
};

export default CrisisSelection;
