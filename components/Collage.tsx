import { collage } from "@/lib/data";

/** Messy pinned wall of screenshots and notes. One overlapping pile, not tidy rows:
 *  items bleed past the text column, overlap on both axes, and sit off the baseline
 *  by a fixed per-index nudge (deterministic, so server and client agree). */
const NUDGE = [0, -26, 14, -12, 22, -6];

export default function Collage() {
  if (collage.length === 0) return null;

  return (
    // Breaks out of the 760px column -- a pile needs room the column doesn't have.
    <section className="relative left-1/2 w-screen -translate-x-1/2 py-12">
      <div className="flex flex-wrap items-center justify-center px-4">
        {collage.map((item, i) => (
          <div
            key={i}
            style={{ transform: `rotate(${item.tilt}deg)`, top: NUDGE[i % NUDGE.length] }}
            className="relative -ml-9 -mt-6 transition-transform duration-200 first:ml-0 sm:-ml-[84px] sm:-mt-8 hover:z-10 hover:scale-[1.06] hover:!rotate-0"
          >
            {item.kind === "photo" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{ width: item.width }}
                className="block max-h-[220px] max-w-[30vw] rounded-sm border border-hairline bg-paper object-cover object-top p-1.5 shadow-[0_10px_24px_-12px_rgba(22,24,29,0.45)] sm:max-w-none"
              />
            ) : (
              <p
                className={`w-[150px] rounded-sm border border-hairline px-4 py-3.5 text-[13px] leading-snug shadow-[0_10px_24px_-12px_rgba(22,24,29,0.45)] ${
                  item.tone === "signal"
                    ? "bg-signal-soft font-mono text-signal"
                    : "bg-paper text-ink-soft"
                }`}
              >
                {item.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
