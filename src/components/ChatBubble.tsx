import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  index?: number;
}

const ChatBubble = ({ message, isUser, index = 0 }: ChatBubbleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.25, delay: index * 0.08 }}
    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-sm leading-relaxed md:text-base shadow-md hover:shadow-lg transition-shadow ${
        isUser
          ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900 rounded-bl-md border border-slate-200"
      }`}
    >
      {message}
    </div>
  </motion.div>
);

export default ChatBubble;
