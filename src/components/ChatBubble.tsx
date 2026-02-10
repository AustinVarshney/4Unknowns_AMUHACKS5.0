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
      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:text-base ${
        isUser
          ? "bg-primary text-primary-foreground rounded-br-md"
          : "bg-secondary text-secondary-foreground rounded-bl-md"
      }`}
    >
      {message}
    </div>
  </motion.div>
);

export default ChatBubble;
