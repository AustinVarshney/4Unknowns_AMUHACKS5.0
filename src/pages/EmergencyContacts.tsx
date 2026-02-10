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
    <PageWrapper className="flex flex-col px-6 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground">My Emergency Contacts</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Save trusted contacts for quick access during emergencies.
        </p>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {contacts.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-card-foreground truncate">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.relation || "Contact"} · {c.phone}</p>
                </div>
                <a
                  href={`tel:${c.phone}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-calm/15 text-calm transition-colors hover:bg-calm/25"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <button
                  onClick={() => remove(c.id)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {contacts.length === 0 && !showForm && (
            <p className="py-8 text-center text-muted-foreground">No contacts saved yet.</p>
          )}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-col gap-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                  type="tel"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={form.relation}
                  onChange={(e) => setForm({ ...form, relation: e.target.value })}
                  placeholder="Relation (e.g., Spouse, Friend)"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="flex gap-2">
                  <button
                    onClick={add}
                    className="flex-1 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Save Contact
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-xl bg-secondary px-4 py-3 text-secondary-foreground transition-colors hover:bg-secondary/80"
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/50 py-4 text-base font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Plus className="h-5 w-5" /> Add Contact
          </motion.button>
        )}
      </div>
    </PageWrapper>
  );
};

export default EmergencyContacts;
