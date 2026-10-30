"use client";
import { useState } from "react";
import AccordionItem, { linkRow, linkCls } from "./AccordionItem";

export type Project = {
  id: string; name: string; status: string; tagline: string;
  availability?: string; story: string; links: { label: string; href: string }[];
};

export const defaultProjects: Project[] = [
  { id: "fin-mcp", name: "Financial Context MCP Server", status: "Run locally",
    tagline: "Market data and news as tools for agents.",
    availability: "Runs locally with Ollama.",
    story: "Agents are bad at stale numbers. This server gives them live prices and headlines, with caching and rate limiting so they stay fast and polite.",
    links: [{ label: "Project notes", href: "#" }] },
  { id: "postmortem", name: "Incident Post-Mortem Assistant", status: "Run locally",
    tagline: "Turns raw incident notes into structured post-mortems.",
    availability: "Runs locally with Ollama.",
    story: "Paste messy notes, watch a post-mortem stream in, and export it in two formats.",
    links: [{ label: "Project notes", href: "#" }] },
  { id: "haha-ok", name: "Haha Ok", status: "Live",
    tagline: "A playful full-stack AI chatbot.",
    availability: "Available to use online.",
    story: "Auth, saved chat history, rate limiting and streaming replies, wrapped in a personality that doesn't take itself seriously.",
    links: [{ label: "Project notes", href: "#" }, { label: "Try it", href: "https://haha-ok.vercel.app" }] },
  { id: "portfolio", name: "Portfolio", status: "Live",
    tagline: "This site.", story: "Next.js, with all content kept in one data file.",
    links: [{ label: "Project notes", href: "#" }] },
];

export type Hackathon = {
  id: string; name: string; result: string; date: string;
  details?: string; link?: { label: string; href: string };
};

// Placeholders: replace with your real hackathons.
export const defaultHackathons: Hackathon[] = [
  { id: "hk-1", name: "Hackathon name", result: "Prize or result", date: "Month YYYY",
    details: "What you built, in a sentence or two." },
  { id: "hk-2", name: "Hackathon name", result: "Prize or result", date: "Month YYYY",
    details: "What you built, in a sentence or two." },
  { id: "hk-3", name: "Hackathon name", result: "Prize or result", date: "Month YYYY",
    details: "What you built, in a sentence or two." },
];

export default function Projects({
  projects = defaultProjects,
  visible = 3,
  hackathons = defaultHackathons,
  hackathonsNote = "A few highlights from hackathons.",
}: { projects?: Project[]; visible?: number; hackathons?: Hackathon[]; hackathonsNote?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  const shown = all ? projects : projects.slice(0, visible);

  return (
    <section id="projects" className="max-w-[780px] scroll-mt-6 pt-20" aria-labelledby="projects-title">
      <h1 id="projects-title" className="font-display text-[32px] font-bold leading-tight tracking-tight text-ink">
        Things I&apos;ve made<span className="text-link">.</span>
      </h1>
      <p className="mb-12 mt-5 text-[20px] leading-[1.8] text-ink-soft">
        Developer tools, AI experiments, and a few trips into systems programming. Open a project for its story and source.
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
            <p className="mb-4">{p.story}</p>
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

      {hackathons.length > 0 && (
        <div className="mt-[88px]">
          <h2 className="border-b border-hairline pb-6 text-[18px] font-semibold text-ink">Built against the clock</h2>
          <p className="mb-6 mt-7 text-[20px] leading-[1.8] text-ink-soft">{hackathonsNote}</p>
          {hackathons.map((h) => {
            const id = `hk-${h.id}`;
            const isOpen = open === id;
            return (
              <AccordionItem
                key={h.id}
                id={id}
                dense
                open={isOpen}
                onToggle={() => setOpen(isOpen ? null : id)}
                head={
                  <>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[19px] font-semibold">{h.name}</span>
                      <span className="mt-1 block text-[17px] text-ink-soft">{h.result}</span>
                    </span>
                    <span className="whitespace-nowrap text-[13px] text-ink-soft">{h.date}</span>
                  </>
                }
              >
                {h.details && <p>{h.details}</p>}
                {h.link && (
                  <div className={linkRow}>
                    <a href={h.link.href} target="_blank" rel="noreferrer" className={linkCls}>{h.link.label} ↗</a>
                  </div>
                )}
              </AccordionItem>
            );
          })}
        </div>
      )}
    </section>
  );
}