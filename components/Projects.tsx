"use client";
import { useState } from "react";
import AccordionItem, { linkRow, linkCls } from "./AccordionItem";
import { projects as allProjects, type Project } from "@/lib/data";

export default function Projects({
  projects = allProjects,
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
        Developer tools, AI experiments, and architecture and infra development; all an excuse for self-expression. These are only the tip of the iceberg of what I&apos;ve built, visit GitHub for more.
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
                <span className="mt-1 block text-[13px] text-ink-soft sm:ml-3 sm:mt-0 sm:inline">{p.status}</span>
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
          className="mt-10 inline-flex items-center gap-2 py-2 text-[15px] text-link transition-colors hover:text-link-hover sm:py-0"
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