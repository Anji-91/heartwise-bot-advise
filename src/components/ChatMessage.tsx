import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage = ({ message, isBot }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md",
          isBot
            ? "bg-white text-gray-800 rounded-tl-none border border-purple-100"
            : "bg-purple-500 text-white rounded-tr-none"
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;