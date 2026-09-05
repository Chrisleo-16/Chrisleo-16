import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/kit/Editorial";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const OPENING =
  "Niaje. I'm the index for this archive — I know the builds, the wrong turns and what Chrisben is currently chasing.\n\nAsk in English, Swahili or Sheng. Ni sawa either way.";

const PROMPTS = [
  { label: "Why the pivot?", msg: "Why did LEA pivot from property management to rent guarantee?" },
  { label: "What broke?", msg: "What are the biggest things that have broken in Chrisben's projects?" },
  { label: "Right now", msg: "What is Chrisben working on right now?" },
  { label: "The data angle", msg: "Why is he studying data science and what is alternative data about?" },
];

/**
 * The archive's own index, as a conversation.
 *
 * Opened from the status rail — there is deliberately no floating bubble on
 * this site. Styled as a terminal panel because that's what it is: a query
 * interface over the same content the pages are built from.
 */
export default function ArchiveBot({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: OPENING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("archive:open", onOpen);
    return () => window.removeEventListener("archive:open", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 220);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [messages, reduce]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || busy) return;
    const next: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("chris-bot", {
        body: { messages: next.filter((m) => m.content !== OPENING) },
      });
      if (error) throw error;
      if (data?.reply) setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      toast({
        title: "The index is offline",
        description: "Try again in a moment, or just keep reading — it's all on the page.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Ask the archive"
          className="fixed bottom-[calc(var(--rail-h)+0.75rem)] right-4 z-50 w-[min(calc(100vw-2rem),24rem)] border border-ink bg-paper sm:right-8"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ boxShadow: "0 24px 60px hsl(var(--ink) / 0.14)" }}
        >
          <header className="flex items-center justify-between border-b border-rule px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-annotate" aria-hidden="true" />
              <Label tone="ink">Ask the archive</Label>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="meta-sm text-muted-foreground transition-colors hover:text-ink"
            >
              Close
            </button>
          </header>

          <div className="flex h-72 flex-col gap-4 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "pl-8" : ""}>
                <Label tone={m.role === "user" ? "muted" : "annotate"} className="block pb-1.5">
                  {m.role === "user" ? "You" : "Archive"}
                </Label>
                <p className="whitespace-pre-line text-[0.875rem] leading-relaxed text-ink">
                  {m.content}
                </p>
              </div>
            ))}
            {busy && (
              <div>
                <Label tone="annotate" className="block pb-1.5">
                  Archive
                </Label>
                <p className="code text-muted-foreground">reading…</p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-rule px-4 py-3">
              {PROMPTS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => send(p.msg)}
                  className="border border-dashed border-rule px-2.5 py-1 ui-label text-[0.625rem] tracking-[0.12em] text-muted-foreground transition-colors hover:border-ink hover:text-ink"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="flex items-center gap-3 border-t border-rule px-4 py-3"
          >
            <span aria-hidden="true" className="code text-annotate">
              &gt;
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              placeholder="Ask about a build, a failure, a decision…"
              aria-label="Ask the archive a question"
              className="min-w-0 flex-1 bg-transparent code text-ink outline-none placeholder:text-muted-foreground/70"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="meta-sm text-ink transition-opacity disabled:opacity-30"
            >
              Send
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
