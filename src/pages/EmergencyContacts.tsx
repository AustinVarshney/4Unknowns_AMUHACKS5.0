import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Phone, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("calmpath-contacts") || "[]");
    } catch {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", relation: "" });

  const save = (list: Contact[]) => {
    setContacts(list);
    localStorage.setItem("calmpath-contacts", JSON.stringify(list));
  };

  const add = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    save([...contacts, { ...form, id: Date.now().toString() }]);
    setForm({ name: "", phone: "", relation: "" });
    setShowForm(false);
  };

  const remove = (id: string) => save(contacts.filter((c) => c.id !== id));

  return (
    <PageWrapper className="flex flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">My Emergency Contacts</h1>
        <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base lg:mb-12 lg:text-lg">
          Save trusted contacts for quick access during emergencies.
        </p>

        <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2 lg:gap-4">
          <AnimatePresence>
            {contacts.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:gap-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:h-12 sm:w-12">
                  <User className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-card-foreground truncate sm:text-lg">{c.name}</p>
                  <p className="text-sm text-muted-foreground sm:text-base">{c.relation || "Contact"} · {c.phone}</p>
                </div>
                <a
                  href={`tel:${c.phone}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-calm/15 text-calm transition-all hover:scale-110 hover:bg-calm/25 sm:h-12 sm:w-12"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <button
                  onClick={() => remove(c.id)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110 hover:bg-destructive/10 hover:text-destructive sm:h-12 sm:w-12"
                >
                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {contacts.length === 0 && !showForm && (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground sm:text-base lg:py-12">No contacts saved yet.</p>
          )}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:mt-6"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-shadow focus:outline-none focus:ring-2 focus:ring-ring sm:text-lg"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                  type="tel"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-shadow focus:outline-none focus:ring-2 focus:ring-ring sm:text-lg"
                />
                <input
                  value={form.relation}
                  onChange={(e) => setForm({ ...form, relation: e.target.value })}
                  placeholder="Relation (e.g., Spouse, Friend)"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-shadow focus:outline-none focus:ring-2 focus:ring-ring sm:text-lg"
                />
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={add}
                    className="flex-1 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:bg-primary/90 sm:text-lg"
                  >
                    Save Contact
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-xl bg-secondary px-4 py-3 text-secondary-foreground transition-all hover:scale-[1.02] hover:bg-secondary/80 sm:px-6 sm:text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/50 py-4 text-base font-semibold text-muted-foreground shadow-sm transition-all hover:border-primary/50 hover:text-foreground hover:shadow-md sm:text-lg lg:mt-8 lg:py-5"
          >
            <Plus className="h-5 w-5 lg:h-6 lg:w-6" /> Add Contact
          </motion.button>
        )}
      </div>
    </PageWrapper>
  );
};

export default EmergencyContacts;
