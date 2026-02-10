import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const ReEvaluation = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <h1 className="mb-3 text-3xl font-bold text-foreground">
          Is the situation under control?
        </h1>
        <p className="mb-12 text-muted-foreground">
          Take a moment to assess before deciding.
        </p>

        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-calm bg-calm/10 px-6 py-5 text-lg font-semibold text-foreground transition-colors hover:bg-calm/20"
          >
            <CheckCircle2 className="h-6 w-6 text-calm" />
            Yes, it's under control
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/emergency")}
            className="pulse-panic flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-panic bg-panic/10 px-6 py-5 text-lg font-semibold text-foreground transition-colors hover:bg-panic/20"
          >
            <AlertTriangle className="h-6 w-6 text-panic" />
            No, still critical
          </motion.button>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default ReEvaluation;