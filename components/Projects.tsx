"use client";
import { useState } from "react";
import AccordionItem, { linkRow, linkCls } from "./AccordionItem";

export type Project = {
  id: string; name: string; status: string; tagline: string;
  /** Three bullets: name what was built, say what it solved, carry a real number. */
  availability?: string; story: string[]; links: { label: string; href: string }[];
};

export const defaultProjects: Project[] = [
  { id: "onvice", name: "Onvice", status: "In progress, runs locally",
    tagline: "Deploy a public GitHub repo from one API call.",
    story: [
      "Built a Go deployment API (Gin) where you POST a GitHub URL and get a deployment id back, after it checks with GitHub that the repo is real and public.",
      "Work disappears when a worker dies mid-build. Postgres is the queue itself; each job is leased for 15 minutes, so a dead worker's job returns to the queue instead of going missing.",
      "The first attempt pins the commit SHA, and the 3 retries back off 30s, 60s and 120s against that exact commit. A retry that builds different code is worse than no retry.",
    ],
    links: [{ label: "Repo Link", href: "https://github.com/AdarshGT33/onvice" }] },
  { id: "fin-mcp", name: "Competitor Research MCP Server", status: "Run locally with Ollama",
    tagline: "Research companies across web, news and finances and get persisted results.",
    story: [
      "Built a multi-agent research system where a coordinator sends web, news and finance agents out per competitor and merges what they bring back into one briefing.",
      "Up to 12 calls run at once across 4 agents per competitor, and asyncio.gather(return_exceptions=True) means a single failure still leaves a usable report.",
      "Cloud models cost money and see your data. Everything runs on a local gemma3:4b through Ollama, with web search and SQLite storage exposed as MCP servers so past research comes back without paying for it twice.",
    ],
    links: [{ label: "Repo Link", href: "https://github.com/AdarshGT33/competitor_research_mcp" }] },
  { id: "postmortem", name: "Incident Post-Mortem Assistant", status: "Run locally with Ollama",
    tagline: "Turns raw incident notes into structured post-mortems.",
    story: [
      "After an incident nobody wants to write it up. Built a FastAPI tool that turns raw on-call notes into a structured post-mortem: root cause, timeline, action items and lessons learned.",
      "A local model that wraps its answer in markdown breaks the parser. 3 layers catch it — JSON mode at temperature 0.2, a regex fallback that strips the fences, and a Pydantic schema that refuses to write anything malformed to SQLite.",
      "Incident notes shouldn't leave the building. The whole thing runs on-premise through Ollama, with 5 REST endpoints and Markdown plus JSON export so a post-mortem can be shared without a cloud account.",
    ],
    links: [{ label: "Repo Link", href: "https://github.com/AdarshGT33/cyber-postmortem-assistant" }] },
  { id: "haha-ok", name: "Haha Ok", status: "Live",
    tagline: "A playful full-stack AI chatbot.",
    story: [
      "Built a full-stack chat app — Clerk for sign-in, Supabase Postgres for users, conversations and messages — so every thread is still there when you come back.",
      "Groq's llama-3.1-8b-instant streams through a TransformStream, so words appear as they are written and the message is saved once the stream closes.",
      "Usage is counted across all of a user's conversations in a rolling 5-hour window — 10 messages free, 30 paid — so cost is capped per person, not per chat.",
    ],
    links: [{ label: "Repo Link", href: "https://github.com/AdarshGT33/haha-ok" }, { label: "Try it", href: "https://haha-ok.vercel.app" }] },
];

export default function Projects({
  projects = defaultProjects,
  visible = 3,
}: { projects?: Project[]; visible?: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  const shown = all ? projects : projects.slice(0, visible);

  return (
    <section id="projects" className="max-w-[780px] scroll-mt-6 pt-20" aria-labelledby="projects-title">
      <h1 id="projects-title" className="font-display text-[32px] font-bold leading-tight tracking-tight text-ink">
        Things I&apos;ve made<span className="text-link">.</span>
      </h1>
      <p className="mb-12 mt-5 text-[20px] leading-[1.8] text-ink-soft">
        Developer tools, AI experiments, and architecture and infra development; All an excuse of self expression. Below are only tip of the iceberg that I built, visit Github for more. 
      </p>

      {shown.map((p) => {
        const isOpen = open === p.id;
        return (
          <AccordionItem
            key={p.id}
            id={`pj-${p.id}`}
            open={isOpen}
            onToggle={() => setOpen(isOpen ? null : p.id)}
            head={
              <span className="min-w-0 flex-1">
                <span className="text-[19px] font-semibold">{p.name}</span>
                <span className="ml-3 text-[13px] text-ink-soft">{p.status}</span>
                <span className="mt-1 block text-[17px] text-ink-soft">{p.tagline}</span>
              </span>
            }
          >
            {p.availability && <p className="mb-4">{p.availability}</p>}
            <ul className="mb-4 list-disc space-y-2 pl-5 marker:text-link">
              {p.story.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <div className={linkRow}>
              {p.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={linkCls}>{l.label} ↗</a>
              ))}
            </div>
          </AccordionItem>
        );
      })}

      {projects.length > visible && (
        <button
          type="button"
          onClick={() => setAll(!all)}
          className="mt-10 inline-flex items-center gap-2 text-[15px] text-link transition-colors hover:text-link-hover"
        >
          {all ? "Show fewer" : `Show all projects (${projects.length})`}
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor"
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform ${all ? "rotate-180" : ""}`}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </section>
  );
}