"use client";
import { useState } from "react";
import AccordionItem, { linkRow, linkCls } from "./AccordionItem";

export type Job = {
  id: string; company: string; role: string; dates: string;
  summary: string; logo?: string; link?: { label: string; href: string };
};

// Placeholders: replace with your real roles / consulting work.
export const defaultJobs: Job[] = [
  { id: "job-1", company: "South Asian Institute for Crime and Justice", role: "AIML Engineer", dates: "July 2026 to now",
    summary: "Short paragraph on what you build here and what you own.",
    link: { label: "Visit Company name", href: "https://www.saicjs.com/suraksha-lens-1" } },
  { id: "job-2", company: "BackkBenchers", role: "AI Creative Technologist", dates: "Jan 2026 to Mar 2026",
    summary: "Short paragraph on the work.", link: { label: "BackkBenchers", href: "https://backkbenchers.in/#" } },
  { id: "job-3", company: "Ekanga", role: "AI Research Intern", dates: "09 2025 to Dec 2025",
    summary: "Short paragraph on the work.", link: { label: "Ekanga", href: "https://www.ekanga.in/"} },
];

export default function Work({ jobs = defaultJobs }: { jobs?: Job[] }) {
  const [open, setOpen] = useState<string | null>(jobs[0]?.id ?? null);

  return (
    <section id="work" className="max-w-[780px] scroll-mt-6 pt-20" aria-labelledby="work-title">
      <h1 id="work-title" className="font-display text-[32px] font-bold leading-tight tracking-tight text-ink">work</h1>
      <p className="mb-12 mt-5 text-[20px] leading-[1.8] text-ink-soft">
        AI, backend, and the systems underneath.
      </p>
      {jobs.map((j) => {
        const isOpen = open === j.id;
        return (
          <AccordionItem
            key={j.id}
            id={`wk-${j.id}`}
            open={isOpen}
            indent={!!j.logo}
            onToggle={() => setOpen(isOpen ? null : j.id)}
            head={
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {j.logo && <img className="mt-0.5 h-7 w-7 flex-none self-start object-contain" src={j.logo} alt="" />}
                <span className="min-w-0 flex-1">
                  <span className="block text-[19px] font-semibold">{j.company}</span>
                  <span className="mt-1 block text-[17px] text-ink-soft">{j.role}</span>
                </span>
                <span className="whitespace-nowrap text-[15px] text-ink-soft">{j.dates}</span>
              </>
            }
          >
            <p className="mb-4">{j.summary}</p>
            {j.link && (
              <div className={linkRow}>
                <a href={j.link.href} target="_blank" rel="noreferrer" className={linkCls}>{j.link.label} ↗</a>
              </div>
            )}
          </AccordionItem>
        );
      })}
    </section>
  );
}