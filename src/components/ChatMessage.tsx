import { ExternalLink } from "lucide-react";

interface ChatMessageProps {
  text: string;
  isBot: boolean;
  links?: { label: string; url: string }[];
}

const ChatMessage = ({ text, isBot, links }: ChatMessageProps) => {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} animate-fade-slide-up`}>
      <div className={`max-w-[85%] ${isBot ? "chat-bubble-bot" : "chat-bubble-user"}`}>
        <p className="whitespace-pre-line text-sm leading-relaxed">{text}</p>
        {links && links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
