import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Volume2, VolumeX, RotateCcw, Moon, Sun, Menu } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import TypingIndicator from "./TypingIndicator";
import { GREETING, MAIN_MENU_OPTIONS, getResponse, type ChatOption } from "@/data/chatbotResponses";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  options?: ChatOption[];
  links?: { label: string; url: string }[];
}

const SESSION_KEY = "aiu_chatbot_session";
const SOUND_KEY = "aiu_chatbot_sound";
const THEME_KEY = "aiu_chatbot_theme";

function loadSession(): Message[] {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return [];
}

function saveSession(messages: Message[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  } catch {}
}

function playMessageSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch {}
}

const ChatBot = () => {
  const savedMessages = loadSession();
  const hasSession = savedMessages.length > 0;

  const [messages, setMessages] = useState<Message[]>(
    hasSession
      ? savedMessages
      : [
          {
            id: "greeting",
            text: GREETING,
            isBot: true,
            options: MAIN_MENU_OPTIONS,
          },
        ]
  );
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundOn, setSoundOn] = useState(() => {
    try { return localStorage.getItem(SOUND_KEY) !== "off"; } catch { return true; }
  });
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) === "dark"; } catch { return false; }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try { localStorage.setItem(THEME_KEY, isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  useEffect(() => {
    try { localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off"); } catch {}
  }, [soundOn]);

  useEffect(() => {
    saveSession(messages);
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addBotResponse = useCallback((input: string) => {
    setIsTyping(true);
    const delay = 400 + Math.random() * 600;
    setTimeout(() => {
      const response = getResponse(input);
      const botMsg: Message = {
        id: Date.now().toString(),
        text: response.text,
        isBot: true,
        options: response.options,
        links: response.links,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      if (soundOn) playMessageSound();
    }, delay);
  }, [soundOn]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now().toString(), text, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    addBotResponse(text);
  };

  const handleOptionSelect = (value: string) => {
    const opt = messages
      .flatMap((m) => m.options || [])
      .find((o) => o.value === value);
    const label = opt?.label || value;
    const userMsg: Message = { id: Date.now().toString(), text: label, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    addBotResponse(value);
  };

  const handleEndSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setMessages([
      {
        id: "greeting",
        text: GREETING,
        isBot: true,
        options: MAIN_MENU_OPTIONS,
      },
    ]);
    setMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  // Latest options to show (from last bot message)
  const lastBotMsg = [...messages].reverse().find((m) => m.isBot && m.options);

  return (
    <div className="chat-container max-w-2xl mx-auto relative">
      {/* Animated background */}
      <div className="animated-bg" />
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shadow-lg z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <span className="font-display font-bold text-secondary-foreground text-sm">AIU</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-base leading-tight">AIU Chatbot</h1>
            <p className="text-[10px] opacity-80">Africa International University</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full right-3 mt-1 bg-card border border-border rounded-xl shadow-xl z-50 min-w-[180px] overflow-hidden animate-fade-slide-up">
            <button
              onClick={handleEndSession}
              className="w-full px-4 py-3 text-sm text-left text-destructive hover:bg-muted transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              End Session
            </button>
            <a
              href="https://www.aiu.ac.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 text-sm text-left text-card-foreground hover:bg-muted transition-colors block"
            >
              🌐 Visit AIU Website
            </a>
          </div>
        )}
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-[1]" onClick={() => setMenuOpen(false)}>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} text={msg.text} isBot={msg.isBot} links={msg.links} />
        ))}
        {isTyping && <TypingIndicator />}

        {/* Show options from last bot message */}
        {!isTyping && lastBotMsg?.options && (
          <ChatOptions options={lastBotMsg.options} onSelect={handleOptionSelect} />
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-card px-4 py-3 relative z-[1]">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all hover:shadow-md active:scale-95"
          >
            <Send className="w-4 h-4" />
            </button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          DEVELOPERS KENYA • <a href="https://www.developerskenya.co.ke/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">www.developerskenya.co.ke</a>
        </p>
      </div>
    </div>

  );
};

export default ChatBot;

