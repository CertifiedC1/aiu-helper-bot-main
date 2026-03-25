import type { ChatOption } from "@/data/chatbotResponses";

interface ChatOptionsProps {
  options: ChatOption[];
  onSelect: (value: string) => void;
}

const ChatOptions = ({ options, onSelect }: ChatOptionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 animate-fade-slide-up px-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className="menu-option-btn flex items-center gap-2"
        >
          {opt.emoji && <span>{opt.emoji}</span>}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChatOptions;
