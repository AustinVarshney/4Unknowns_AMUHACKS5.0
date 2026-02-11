import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";

const tips = [
  {
    title: "🩹 Cuts & Bleeding",
    steps: [
      "Apply firm pressure with a clean cloth or bandage.",
      "Keep the wound elevated above the heart if possible.",
      "Don't remove the cloth — add more layers on top if needed.",
      "Seek medical help if bleeding doesn't stop within 10 minutes.",
    ],
  },
  {
    title: "🔥 Burns",
    steps: [
      "Cool the burn under cool (not cold) running water for at least 10 minutes.",
      "Do NOT apply ice, butter, or toothpaste.",
      "Cover loosely with a sterile, non-stick bandage.",
      "Seek help for burns larger than your palm or on face/joints.",
    ],
  },
  {
    title: "🦴 Fractures & Sprains",
    steps: [
      "Immobilize the injured area — don't try to realign bones.",
      "Apply ice wrapped in cloth for 20 minutes.",
      "Elevate the injury to reduce swelling.",
      "Seek medical attention for any suspected fracture.",
    ],
  },
  {
    title: "😵 Fainting / Unconsciousness",
    steps: [
      "Lay the person on their back and elevate their legs.",
      "Loosen any tight clothing around neck and waist.",
      "Check for breathing — if absent, begin CPR.",
      "Do NOT give food or water to an unconscious person.",
    ],
  },
  {
    title: "🐝 Allergic Reactions",
    steps: [
      "Use an epinephrine auto-injector (EpiPen) if available.",
      "Call emergency services immediately for severe reactions.",
      "Keep the person calm and lying down with legs elevated.",
      "Monitor breathing until help arrives.",
    ],
  },
  {
    title: "💧 Choking",
    steps: [
      "Ask 'Are you choking?' — if they can't speak, act immediately.",
      "Stand behind them and give 5 back blows between shoulder blades.",
      "Follow with 5 abdominal thrusts (Heimlich maneuver).",
      "Repeat until the object is dislodged or help arrives.",
    ],
  },
];

const FirstAidTips = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="flex flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">First Aid Quick Reference</h1>
        <p className="mb-6 text-center text-sm text-muted-foreground sm:mb-8 sm:text-base lg:text-lg">
          Tap a topic for step-by-step guidance.
        </p>

        <Accordion type="single" collapsible className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <AccordionItem
                value={tip.title}
                className="rounded-xl border border-border bg-card px-4 shadow-sm transition-all hover:shadow-md data-[state=open]:border-primary/40 sm:px-5 lg:px-6"
              >
                <AccordionTrigger className="py-4 text-base font-semibold text-card-foreground hover:no-underline sm:text-lg">
                  {tip.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="flex flex-col gap-2.5 pb-3 lg:gap-3">
                    {tip.steps.map((s, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground sm:gap-3 sm:text-base">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary sm:h-6 sm:w-6 sm:text-sm">
                          {j + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </PageWrapper>
  );
};

export default FirstAidTips;
