import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner.tsx";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import BreathingExercise from "./pages/BreathingExercise";
import ChatBot from "./pages/ChatBot";
import CrisisSelection from "./pages/CrisisSelection";
import EmergencyContacts from "./pages/EmergencyContacts";
import EmergencyEscalation from "./pages/EmergencyEscalation";
import FirstAidTips from "./pages/FirstAidTip.tsx";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReEvaluation from "./pages/ReEvaluation";
import SafetyChecklist from "./pages/SafetyChecklist";
import Tutorial from "./pages/Tutorial";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/select" element={<CrisisSelection />} />
            <Route path="/chat/:crisisType" element={<ChatBot />} />
            <Route path="/tutorial/:crisisType" element={<Tutorial />} />
            <Route path="/evaluate" element={<ReEvaluation />} />
            <Route path="/emergency" element={<EmergencyEscalation />} />
            <Route path="/breathe" element={<BreathingExercise />} />
            <Route path="/checklist" element={<SafetyChecklist />} />
            <Route path="/contacts" element={<EmergencyContacts />} />
            <Route path="/first-aid" element={<FirstAidTips />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
