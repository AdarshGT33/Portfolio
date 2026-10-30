import { collage } from "@/lib/data";

/** Messy pinned wall of screenshots and notes. Overlaps via negative margins so
 *  it reflows on narrow screens instead of needing absolute positioning. */
export default function Collage() {
  if (collage.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex flex-wrap items-center justify-center gap-y-6">
        {collage.map((item, i) => (
          <div
            key={i}
            style={{ transform: `rotate(${item.tilt}deg)` }}
            className="relative -ml-6 transition-transform duration-200 first:ml-0 hover:z-10 hover:scale-[1.06] hover:!rotate-0"
          >
            {item.kind === "photo" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{ width: item.width }}
                className="block max-h-[220px] rounded-sm border border-hairline bg-paper object-cover object-top p-1.5 shadow-[0_10px_24px_-12px_rgba(22,24,29,0.45)]"
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
