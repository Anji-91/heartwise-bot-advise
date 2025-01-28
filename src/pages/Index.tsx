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

const initialMessages = [
  { 
    text: "Hey there! 👋 I'm your friendly relationship advisor. I'm here to chat and help you navigate through your relationship journey!", 
    isBot: true 
  },
  { 
    text: "Before we dive in, how are you feeling today? Feel free to share what's on your mind, or you can choose from some common topics below.", 
    isBot: true 
  }
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
  "Let me help you improve your relationship communication. Here are some proven strategies:",
  `Here are essential communication techniques that can transform your relationship:

1. Practice Active Listening
   - Give your full attention when your partner speaks
   - Maintain eye contact and put away distractions
   - Nod and use verbal cues to show you're engaged
   - Reflect back what you've heard to ensure understanding
   - Wait until they finish before responding

2. Use "I" Statements
   - Instead of "You never listen," try "I feel unheard when..."
   - Express feelings without blame
   - Share your perspective clearly
   - Focus on specific situations rather than generalizations
   - Take responsibility for your own emotions

3. Choose the Right Time and Setting
   - Pick a calm moment for important discussions
   - Ensure privacy and minimize distractions
   - Set aside dedicated time for conversations
   - Consider your partner's schedule and energy levels
   - Create a comfortable environment for both parties

4. Show Empathy and Validation
   - Acknowledge your partner's feelings
   - Try to understand their perspective
   - Show that their feelings matter to you
   - Use phrases like "That must be difficult" or "I understand why you feel that way"
   - Avoid dismissing or minimizing their emotions

5. Practice Non-Verbal Communication
   - Be mindful of your body language
   - Match your facial expressions to your words
   - Use appropriate gestures and tone
   - Maintain an open posture
   - Pay attention to your partner's non-verbal cues

6. Handle Conflict Constructively
   - Stay focused on the current issue
   - Avoid bringing up past grievances
   - Take breaks if emotions run high
   - Look for compromise and win-win solutions
   - Focus on the problem, not the person

7. Regular Check-ins
   - Schedule weekly relationship check-ins
   - Share appreciation and gratitude
   - Discuss goals and future plans
   - Address small issues before they grow
   - Celebrate progress and improvements`,
  "Would you like to explore any specific communication technique in more detail?",
  "Remember, good communication takes practice. Which of these areas would you like to work on first?",
  `Here are some common communication pitfalls to avoid:

1. Criticism vs. Complaints
   - Criticism attacks character
   - Complaints address specific behaviors
   - Learn to express needs constructively

2. Defensiveness
   - Listen without immediately defending
   - Take responsibility where appropriate
   - Focus on understanding before responding

3. Stonewalling
   - Recognize when you're overwhelmed
   - Take healthy breaks (20-30 minutes)
   - Return to the conversation when calm

4. Contempt
   - Avoid sarcasm and mockery
   - Build a culture of respect
   - Focus on appreciation`
];

const trustResponses = [
  "Trust issues can be challenging but they can be worked through with patience and commitment.",
  "Here are some ways to build trust:\n1. Be consistent in your words and actions\n2. Practice open and honest communication\n3. Respect boundaries and agreements\n4. Take responsibility for mistakes\n5. Seek professional help if needed",
  "Building trust takes time, and it's okay to take small steps forward.",
  "Would you like to explore specific trust concerns in your relationship?"
];

const negativeEmotionResponses = [
  "I'm sorry to hear that you're feeling bad. Would you like to talk about what's troubling you? Sometimes sharing our feelings can be the first step towards feeling better.",
  "It takes courage to acknowledge when we're not feeling our best. I'm here to listen and support you through this. What's been on your mind?",
  "I understand that difficult emotions can be overwhelming. Would you like to share what's making you feel this way? Together, we can explore ways to help you feel better.",
  "Thank you for being honest about your feelings. Everyone goes through tough times, and it's okay to not be okay. Would you like to tell me more about what's bothering you?",
  "I hear you, and I want you to know that your feelings are valid. Sometimes relationships can bring up challenging emotions. Would you like to explore what's causing these feelings?",
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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

    // Add empathetic acknowledgment before specific responses
    const addAcknowledgment = () => {
      setTimeout(() => {
        const acknowledgment = {
          text: "I understand how important this is to you. Let me share some helpful insights about this.",
          isBot: true,
        };
        setMessages((prev) => [...prev, acknowledgment]);
      }, 1000);
    };

    // Handle different types of messages
    if (text.toLowerCase().includes("bad") || 
        text.toLowerCase().includes("sad") || 
        text.toLowerCase().includes("hurt") || 
        text.toLowerCase().includes("upset")) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * negativeEmotionResponses.length);
        const response = {
          text: negativeEmotionResponses[randomIndex],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setIsTyping(false);
      }, 1500);
    } else if (text.toLowerCase().includes("breakup") || text === "How to move on after breakup?") {
      addAcknowledgment();
      setTimeout(() => {
        const response = {
          text: breakupResponses[currentBreakupResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentBreakupResponse((prev) => (prev + 1) % breakupResponses.length);
        setIsTyping(false);
      }, 2500);
    } else if (text.toLowerCase().includes("the one") || text === "How do I know if they're the one?") {
      addAcknowledgment();
      setTimeout(() => {
        const response = {
          text: soulMateResponses[currentSoulMateResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentSoulMateResponse((prev) => (prev + 1) % soulMateResponses.length);
        setIsTyping(false);
      }, 2500);
    } else if (text.toLowerCase().includes("communication") || text === "How to improve communication?") {
      addAcknowledgment();
      setTimeout(() => {
        const response = {
          text: communicationResponses[currentCommunicationResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentCommunicationResponse((prev) => (prev + 1) % communicationResponses.length);
        setIsTyping(false);
      }, 2500);
    } else if (text.toLowerCase().includes("trust") || text === "Dealing with trust issues") {
      addAcknowledgment();
      setTimeout(() => {
        const response = {
          text: trustResponses[currentTrustResponse],
          isBot: true,
        };
        setMessages((prev) => [...prev, response]);
        setCurrentTrustResponse((prev) => (prev + 1) % trustResponses.length);
        setIsTyping(false);
      }, 2500);
    } else {
      // More conversational default response
      setTimeout(() => {
        const botResponse = {
          text: "I hear you. Relationships can be complex and every situation is unique. Would you like to tell me more about what you're experiencing? Or we can explore one of the topics I mentioned above.",
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
