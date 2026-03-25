import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatBot from "./ChatBot";

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-[380px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-slide-up">
          <ChatBot />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-auto flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default FloatingChatWidget;
