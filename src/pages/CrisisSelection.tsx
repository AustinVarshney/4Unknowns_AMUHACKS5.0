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
    <PageWrapper className="flex flex-col px-6 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl"
      >
        What kind of situation are you facing?
      </motion.h1>
      <p className="mb-10 text-center text-muted-foreground">
        Select the type of emergency for guided help.
      </p>

      <div className="mx-auto grid w-full max-w-lg gap-4 sm:grid-cols-2">
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
    </PageWrapper>
  );
};

export default CrisisSelection;
