import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import SuggestionChip from "@/components/SuggestionChip";
import TypingIndicator from "@/components/TypingIndicator";

interface Message {
  text: string;
  isBot: boolean;
}

const suggestions = [
  "How do I know if they're the one?",
  "How to improve communication?",
  "Dealing with trust issues",
  "How to move on after breakup?",
];

const breakupResponses = [
  "I understand this is a difficult time. Moving on after a breakup takes time and patience.",
  "Here are some helpful steps to heal:\n1. Allow yourself to feel your emotions\n2. Focus on self-care and personal growth\n3. Spend time with supportive friends and family\n4. Develop new hobbies or interests\n5. Consider professional help if needed",
  "Remember that healing isn't linear - some days will be better than others, and that's okay.",
  "Would you like to discuss any specific aspect of moving on that you're struggling with?"
];

const soulMateResponses = [
  "Recognizing 'the one' often involves multiple aspects of your relationship:",
  "Key signs include:\n1. You can be completely yourself around them\n2. You share similar values and life goals\n3. You communicate effectively, even during disagreements\n4. You support each other's growth and independence\n5. You feel secure and trusted in the relationship",
  "Remember that healthy relationships require ongoing effort and growth from both partners.",
  "Would you like to explore any specific aspects of your relationship that you're unsure about?"
];

const communicationResponses = [
  "Effective communication is the foundation of any strong relationship. Here are some key strategies:",
  "Important tips:\n1. Practice active listening without interrupting\n2. Use 'I' statements to express feelings\n3. Choose the right time and place for important discussions\n4. Be honest but kind in your approach\n5. Acknowledge and validate your partner's feelings",
  "Regular check-ins and creating a safe space for open dialogue can strengthen your bond.",
  "Would you like to discuss specific communication challenges you're facing?"
];

const trustResponses = [
  "Trust issues can be challenging but they can be worked through with patience and commitment.",
  "Here are some ways to build trust:\n1. Be consistent in your words and actions\n2. Practice open and honest communication\n3. Respect boundaries and agreements\n4. Take responsibility for mistakes\n5. Seek professional help if needed",
  "Building trust takes time, and it's okay to take small steps forward.",
  "Would you like to explore specific trust concerns in your relationship?"
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your relationship advisor. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentBreakupResponse, setCurrentBreakupResponse] = useState(0);
  const [currentSoulMateResponse, setCurrentSoulMateResponse] = useState(0);
  const [currentCommunicationResponse, setCurrentCommunicationResponse] = useState(0);
  const [currentTrustResponse, setCurrentTrustResponse] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessage = { text, isBot: false };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    // Handle different types of messages
    if (text.toLowerCase().includes("breakup") || text === "How to move on after breakup?") {
      setTimeout(() => {
        const response = {
          text: breakupResponses[currentBreakupResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentBreakupResponse((prev) => (prev + 1) % breakupResponses.length);
        setIsTyping(false);
      }, 1500);
    } else if (text.toLowerCase().includes("the one") || text === "How do I know if they're the one?") {
      setTimeout(() => {
        const response = {
          text: soulMateResponses[currentSoulMateResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentSoulMateResponse((prev) => (prev + 1) % soulMateResponses.length);
        setIsTyping(false);
      }, 1500);
    } else if (text.toLowerCase().includes("communication") || text === "How to improve communication?") {
      setTimeout(() => {
        const response = {
          text: communicationResponses[currentCommunicationResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentCommunicationResponse((prev) => (prev + 1) % communicationResponses.length);
        setIsTyping(false);
      }, 1500);
    } else if (text.toLowerCase().includes("trust") || text === "Dealing with trust issues") {
      setTimeout(() => {
        const response = {
          text: trustResponses[currentTrustResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentTrustResponse((prev) => (prev + 1) % trustResponses.length);
        setIsTyping(false);
      }, 1500);
    } else {
      // Default response for other messages
      setTimeout(() => {
        const botResponse = {
          text: "Thank you for sharing. I understand relationships can be complex. Would you like to explore this topic further?",
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIzOSwgMjQ2LCAyNTUsIDAuNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div className="container max-w-2xl mx-auto p-4 relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion) => (
              <SuggestionChip
                key={suggestion}
                text={suggestion}
                onClick={handleSend}
              />
            ))}
          </div>
          <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isBot={message.isBot}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
            />
            <Button onClick={() => handleSend(input)}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;