"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";

// `error` notes are shown to the visitor but never sent back to the model.
type Msg = { role: "user" | "assistant"; content: string; error?: true };

// Shown before the first message, so a recruiter doesn't have to think of one.
const STARTERS = [
  "What is Adarsh working on right now?",
  "Which projects use LLMs or agents?",
  "What backend experience does Adarsh have?",
];

/** Floating "ask about me" chat. Lives in the layout, so the conversation
 *  survives moving between pages. */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [msgs, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => !m.error).slice(-10).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      setMsgs([...next, data.reply
        ? { role: "assistant", content: data.reply }
        : { role: "assistant", content: data.error ?? "Something went wrong. Try again?", error: true }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Couldn't reach the server. Check your connection?", error: true }]);
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Ask about Adarsh"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="fixed bottom-20 right-4 z-50 flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col rounded-xl border border-hairline bg-[var(--bg)] shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <p className="font-display text-[15px] font-semibold text-ink">Ask about Adarsh</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"
              className="px-1 text-[20px] leading-none text-ink-soft hover:text-ink">×</button>
          </div>

          <div ref={log} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[15px] leading-relaxed">
            {msgs.length === 0 && (
              <>
                <p className="text-ink-soft">
                  I&apos;m an AI assistant. Ask me about Adarsh&apos;s projects, work, or skills.
                </p>
                <div className="flex flex-col items-start gap-2">
                  {STARTERS.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)}
                      className="rounded-lg border border-hairline px-3 py-1.5 text-left text-[14px] text-link transition-colors hover:text-link-hover">
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
            {msgs.map((m, i) => (
              <p key={i} className={m.role === "user"
                ? "ml-8 whitespace-pre-wrap rounded-lg bg-surface px-3 py-2 text-ink"
                : "mr-8 whitespace-pre-wrap text-ink-soft"}>
                {m.content}
              </p>
            ))}
            {busy && <p className="text-ink-soft"><span className="cursor-blink">▍</span></p>}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-hairline p-3">
            <input
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask a question…"
              aria-label="Your question"
              // 16px: anything smaller makes iOS Safari zoom the page on focus.
              className="min-w-0 flex-1 rounded-lg border border-hairline bg-transparent px-3 py-2 text-[16px] text-ink outline-none placeholder:text-ink-soft focus:border-[color:var(--link)]"
            />
            <button type="submit" disabled={busy || !input.trim()}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-link transition-colors hover:text-link-hover disabled:opacity-40">
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-hairline bg-[var(--bg)] px-4 py-2.5 font-mono text-[14px] text-link shadow-lg transition-colors hover:text-link-hover"
      >
        {open ? "close" : "ask about me"}
      </button>
    </>
  );
}
