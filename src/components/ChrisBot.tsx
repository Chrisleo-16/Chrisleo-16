import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, MessageSquare, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message { role: "user" | "assistant"; content: string; }

// ─── Bot Float Button ──────────────────────────────────────────────────────
const BotButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="relative w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden bg-foreground border border-foreground"
    initial={{ scale: 0, rotate: -20, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    exit={{ scale: 0, rotate: 20, opacity: 0 }}
    transition={{ type: "spring", stiffness: 280, damping: 20 }}
    whileHover={{ scale: 1.08, opacity: 0.85 }}
    whileTap={{ scale: 0.92 }}
  >
    <MessageSquare className="w-5 h-5 text-background relative z-10" />
  </motion.button>
);

// ─── Typing dots ──────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3 rounded-xl border border-border bg-secondary">
    {[0, 0.15, 0.3].map((d, i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-foreground/50"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: d }}
      />
    ))}
  </div>
);

const ChrisBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const check = () => { if (localStorage.getItem("preloader-complete") === "true") setShowBot(true); };
    check();
    window.addEventListener("preloader-complete", () => setShowBot(true));
    return () => window.removeEventListener("preloader-complete", () => setShowBot(true));
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasShownGreeting) {
      setMessages([{ role: "assistant", content: "Eish! Chris ameni-program vibaya bana — sasa niko hapa kupiga story.\nUnataka tuende na lugha gani? Sheng? Swahili? Ama English ya ku-make investor smile? 😏" }]);
      setHasShownGreeting(true);
    }
    setTimeout(() => inputRef.current?.focus(), 350);
  };

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: Message = { role: "user", content: msg };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chris-bot", { body: { messages: [...messages, userMsg] } });
      if (error) throw error;
      if (data?.reply) setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      toast({ title: "Eeh! ChrisBot ame-hang 🤖", description: "Try again in a sec!", variant: "destructive" });
    } finally { setIsLoading(false); }
  };

  const quickActions = [
    { key: "projects", label: "Projects", msg: "Show me Chris's dopest projects" },
    { key: "skills",   label: "Skills",   msg: "What are Chris's superpowers?" },
    { key: "tour",     label: "Tour",     msg: "Take me through the portfolio" },
    { key: "secret",   label: "Spicy",    msg: "Tell me something spicy about Chris" },
  ];

  if (!showBot) return null;

  return (
    <>
      {/* Float button */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
        <AnimatePresence>
          {!isOpen && <BotButton onClick={handleOpen} />}
        </AnimatePresence>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[calc(100vw-2rem)]"
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className="rounded-xl overflow-hidden border border-border bg-card"
              style={{ boxShadow: "0 24px 60px hsl(var(--foreground) / 0.12)" }}
            >
              {/* Header */}
              <div className="relative px-5 py-4 flex items-center justify-between border-b border-border bg-secondary/50">
                <div className="absolute top-0 left-0 right-0 h-px bg-foreground/15" />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-foreground">
                    <Bot className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm text-foreground"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      ChrisBot
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-pulse" />
                      Your sarcastic mate 😏
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Messages */}
              <div
                className="h-72 md:h-80 overflow-y-auto p-4 flex flex-col gap-3 bg-background"
                style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(var(--border)) transparent" }}
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                      initial={{ opacity: 0, y: 12, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mb-0.5 bg-foreground">
                          <Bot className="w-3 h-3 text-background" />
                        </div>
                      )}
                      <div
                        className="max-w-[78%] rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line"
                        style={
                          msg.role === "user"
                            ? {
                                background: "hsl(var(--foreground))",
                                color: "hsl(var(--background))",
                                borderBottomRightRadius: 4,
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }
                            : {
                                background: "hsl(var(--secondary))",
                                border: "1px solid hsl(var(--border))",
                                color: "hsl(var(--foreground))",
                                borderBottomLeftRadius: 4,
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }
                        }
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div className="flex items-end gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center bg-foreground">
                      <Bot className="w-3 h-3 text-background" />
                    </div>
                    <TypingDots />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick actions */}
              {messages.length <= 1 && (
                <motion.div
                  className="px-4 py-3 border-t border-border bg-secondary/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p
                    className="text-[10px] font-mono text-muted-foreground mb-2 tracking-wider uppercase"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Quick picks
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickActions.map(({ key, label, msg }) => (
                      <motion.button
                        key={key}
                        onClick={() => sendMessage(msg)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-secondary transition-all"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Input */}
              <div className="px-4 py-3 border-t border-border bg-secondary/20">
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground/40 transition-all"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-background bg-foreground disabled:opacity-30 transition-all"
                    whileHover={{ opacity: 0.85 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChrisBot;
