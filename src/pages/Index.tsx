import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { Shield, Mic, BookOpen, Phone, Wind, ClipboardCheck, Users, Heart } from "lucide-react";

const features = [
  { icon: Shield, title: "Panic-aware guidance", desc: "Adapts to your stress level" },
  { icon: Mic, title: "Voice & text support", desc: "Communicate however feels right" },
  { icon: BookOpen, title: "Step-by-step tutorials", desc: "Clear actions when you need them" },
  { icon: Phone, title: "Emergency escalation", desc: "Connect to help instantly" },
];

const tools = [
  { icon: Wind, title: "Breathing Exercise", desc: "Calm your mind with guided breathing", path: "/breathe", color: "bg-calm/15 text-calm" },
  { icon: ClipboardCheck, title: "Safety Checklist", desc: "Prepare before a crisis strikes", path: "/checklist", color: "bg-stressed/15 text-stressed" },
  { icon: Users, title: "Emergency Contacts", desc: "Save trusted contacts for quick access", path: "/contacts", color: "bg-primary/15 text-primary" },
  { icon: Heart, title: "First Aid Tips", desc: "Quick reference for common emergencies", path: "/first-aid", color: "bg-panic/15 text-panic" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15"
        >
          <Shield className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          CalmPath
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-lg text-muted-foreground md:text-xl"
        >
          Personal Crisis Decision Assistant
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 max-w-md text-base text-muted-foreground/80"
        >
          Turn panic into clarity with step-by-step crisis guidance.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/select")}
          className="pulse-glow rounded-2xl bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
        >
          Start Now
        </motion.button>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/50 px-6 py-16">
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="border-t border-border px-6 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl"
        >
          Wellness & Preparedness Tools
        </motion.h2>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {tools.map((t, i) => (
            <motion.button
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(t.path)}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${t.color}`}>
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Index;