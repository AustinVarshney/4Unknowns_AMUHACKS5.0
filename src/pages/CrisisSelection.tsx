import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CrisisCard from "../components/CrisisCard";
import PageWrapper from "../components/PageWrapper";

const crises = [
  { emoji: "🏥", title: "Medical Emergency", type: "medical" },
  { emoji: "🔥", title: "Fire Emergency", type: "fire" },
  { emoji: "👮", title: "Personal Safety", type: "safety" },
  { emoji: "⚠️", title: "Other Crisis", type: "other" },
];

const CrisisSelection = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="flex min-h-screen flex-col px-4 py-6 sm:px-6 sm:py-8 lg:h-screen lg:overflow-hidden lg:px-12 lg:py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-foreground lg:mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center lg:mb-12"
        >
          <h1 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            What kind of situation are you facing?
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
            Select the type of emergency for guided help.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 w-full max-w-5xl gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {crises.map((c, i) => (
            <CrisisCard
              key={c.type}
              emoji={c.emoji}
              title={c.title}
              index={i}
              onClick={() => navigate(`/chat/${c.type}`)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs text-muted-foreground sm:text-sm lg:mt-12 lg:text-base"
        >
          💡 Not sure which to choose? Select "Other Crisis" for general guidance.
        </motion.p>
      </div>
    </PageWrapper>
  );
};

export default CrisisSelection;
