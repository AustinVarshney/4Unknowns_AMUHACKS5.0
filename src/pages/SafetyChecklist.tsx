import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { ArrowLeft, CheckSquare, Square } from "lucide-react";

const categories = [
  {
    title: "🏠 Home Safety",
    items: [
      "Smoke detectors installed and tested",
      "Fire extinguisher accessible",
      "Emergency exits identified",
      "First aid kit stocked and accessible",
      "Emergency numbers posted visibly",
    ],
  },
  {
    title: "📱 Digital Preparedness",
    items: [
      "Emergency contacts saved in phone",
      "Location sharing enabled with trusted person",
      "Medical info on phone lock screen",
      "Offline maps downloaded for your area",
    ],
  },
  {
    title: "🎒 Go-Bag Essentials",
    items: [
      "Water (3-day supply per person)",
      "Non-perishable food & can opener",
      "Flashlight & extra batteries",
      "Important documents in waterproof bag",
      "Cash in small denominations",
      "Basic medications & prescriptions",
    ],
  },
];

const SafetyChecklist = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem("calmpath-checklist") || "{}");
    } catch {
      return {};
    }
  });

  const toggle = (item: string) => {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    localStorage.setItem("calmpath-checklist", JSON.stringify(next));
  };

  const total = categories.flatMap((c) => c.items).length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <PageWrapper className="flex flex-col px-6 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <div className="mx-auto w-full max-w-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground">Safety Checklist</h1>
        <p className="mb-4 text-center text-muted-foreground">Be prepared before a crisis happens.</p>

        {/* Progress */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-2 max-w-xs overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-calm"
              animate={{ width: `${(done / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {done}/{total} completed
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
            >
              <h2 className="mb-3 text-lg font-semibold text-foreground">{cat.title}</h2>
              <div className="flex flex-col gap-2">
                {cat.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggle(item)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      checked[item]
                        ? "border-calm/50 bg-calm/10 text-foreground"
                        : "border-border bg-card text-card-foreground hover:border-primary/30"
                    }`}
                  >
                    {checked[item] ? (
                      <CheckSquare className="h-5 w-5 shrink-0 text-calm" />
                    ) : (
                      <Square className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <span className={checked[item] ? "line-through opacity-70" : ""}>{item}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default SafetyChecklist;