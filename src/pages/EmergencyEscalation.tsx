import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const services = [
  { label: "Ambulance", number: "102", emoji: "🚑" },
  { label: "Fire Department", number: "101", emoji: "🚒" },
  { label: "Police", number: "100", emoji: "🚔" },
  { label: "Emergency (Universal)", number: "112", emoji: "📞" },
];

const EmergencyEscalation = () => {
  const navigate = useNavigate();

  const shareLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://maps.google.com/maps?q=${latitude},${longitude}`;
          if (navigator.share) {
            navigator.share({ title: "My Location (Emergency)", url });
          } else {
            window.open(url, "_blank");
          }
        },
        () => alert("Unable to access location. Please share manually.")
      );
    }
  };

  return (
    <PageWrapper className="flex flex-col px-6 py-8">
      <button
        onClick={() => navigate("/evaluate")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mx-auto w-full max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-panic/15">
            <Phone className="h-8 w-8 text-panic" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Emergency Help
          </h1>
          <p className="text-muted-foreground">
            Call the appropriate service immediately.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <motion.a
              key={s.number}
              href={`tel:${s.number}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-panic/50"
            >
              <span className="text-3xl">{s.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-card-foreground">{s.label}</p>
                <p className="text-sm text-muted-foreground">{s.number}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-panic text-destructive-foreground pulse-panic">
                <Phone className="h-5 w-5" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={shareLocation}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-secondary px-6 py-4 text-base font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          <MapPin className="h-5 w-5" /> Share Live Location
        </motion.button>
      </div>
    </PageWrapper>
  );
};

export default EmergencyEscalation;
