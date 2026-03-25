const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-slide-up">
      <div className="chat-bubble-bot flex items-center gap-1.5 py-4 px-5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
};

export default TypingIndicator;
