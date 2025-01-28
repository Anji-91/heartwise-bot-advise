const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-2 animate-fade-in">
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
    </div>
  );
};

export default TypingIndicator;