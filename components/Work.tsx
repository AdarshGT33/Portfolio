"use client";
import { useState } from "react";
import AccordionItem, { linkRow, linkCls } from "./AccordionItem";
import { jobs as allJobs, type Job } from "@/lib/data";

export default function Work({ jobs = allJobs }: { jobs?: Job[] }) {
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
                  {/* On a phone the dates sit under the role; side by side they
                      tangle with a role long enough to wrap. */}
                  <span className="mt-1 block text-[15px] text-ink-soft sm:hidden">{j.dates}</span>
                </span>
                <span className="hidden whitespace-nowrap text-[15px] text-ink-soft sm:inline">{j.dates}</span>
              </>
            }
          >
            <ul className="mb-4 list-disc space-y-2 pl-5 marker:text-link">
              {j.summary.map((point) => <li key={point}>{point}</li>)}
            </ul>
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