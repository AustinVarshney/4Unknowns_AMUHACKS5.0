import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Heart,
  Mic,
  Phone,
  Shield,
  Sparkles,
  Users,
  Wind,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LiveLocationMap from "../components/LiveLocationMap";
import PageWrapper from "../components/PageWrapper";

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

const stats = [
  { value: "24/7", label: "Guidance availability" },
  { value: "1-tap", label: "Emergency escalation" },
  { value: "5 min", label: "Grounding routines" },
];

const steps = [
  {
    title: "Select your situation",
    desc: "Choose the crisis type to get focused, tailored steps.",
  },
  {
    title: "Follow calm guidance",
    desc: "Clear, bite-sized actions reduce confusion and panic.",
  },
  {
    title: "Connect to help",
    desc: "Escalate with contacts or emergency services when needed.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="relative flex flex-col overflow-hidden">
      <LiveLocationMap />
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--calm)/0.45),_transparent_70%)] blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -22, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.35),_transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 hero-grid opacity-70" />
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[80vh] w-full items-center px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 lg:flex-row lg:items-start">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Personalized crisis guidance
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              CalmPath helps you find
              <span className="block font-serif text-foreground">
                clarity in the storm.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl"
            >
              A personal crisis decision assistant that grounds you, guides you, and connects
              you to help when it matters most.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={() => navigate("/select")}
                className="pulse-glow inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
              >
                Start Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/breathe")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/80 px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary/40"
              >
                Try a 2-minute calm
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card/70 px-5 py-4 text-left shadow-sm"
                >
                  <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex w-full max-w-md flex-1 flex-col gap-4"
          >
            <div className="glass-panel rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active crisis mode</p>
                    <p className="text-lg font-semibold text-foreground">Stay grounded</p>
                  </div>
                </div>
                <span className="rounded-full bg-calm/20 px-3 py-1 text-xs font-semibold text-calm text-center">
                  Safe pace
                </span>
              </div>
              <div className="mt-6 space-y-3">
                {features.slice(0, 3).map((feature) => (
                  <div key={feature.title} className="flex items-center gap-3 rounded-2xl bg-background/70 px-4 py-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-panic/15">
                  <Phone className="h-5 w-5 text-panic" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emergency contact ready</p>
                  <p className="text-base font-semibold text-foreground">One-tap escalation</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/emergency")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-panic px-4 py-3 text-sm text-white font-bold transition-colors hover:bg-panic/90"
              >
                Connect now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative border-t border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Built for clarity
            </p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              The calm you can rely on
            </h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="glass-panel flex h-full flex-col gap-4 rounded-3xl p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-border bg-card/40 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">How CalmPath works</h2>
            <p className="mt-3 text-muted-foreground">Three steps to regain a sense of control.</p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="rounded-3xl border border-border bg-background/70 p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Care toolkit
            </p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              Wellness & Preparedness Tools
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {tools.map((t, i) => (
              <motion.button
                key={t.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(t.path)}
                className="glass-panel flex items-start gap-4 rounded-3xl p-6 text-left transition-colors hover:border-primary/40"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${t.color}`}>
                  <t.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl bg-primary/10 px-8 py-12 text-center">
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">You are not alone in this</h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            CalmPath keeps you steady with simple steps, calm rituals, and trusted support
            when you need it most.
          </p>
          <button
            onClick={() => navigate("/select")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            Begin your path
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Index;