import { profile, timeline, asides } from "@/lib/data";

export default function Hero() {
  return (
    <section className="pt-14 pb-10">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {profile.name}
      </h1>
      <p className="mt-1.5 text-[15px] text-ink-soft">
        {profile.location}
      </p>

      <p className="mt-8 text-[17px] leading-relaxed text-ink-soft">
        {profile.bio}
      </p>

      <div className="mt-8 space-y-2.5 text-[17px] leading-relaxed text-ink-soft">
        {timeline.map((t) => (
          <p key={t.org}>
            {t.lead}{" "}
            <a
              href={t.href}
              className="text-link underline decoration-[color:var(--link-line)] underline-offset-[6px] transition-colors hover:text-link-hover hover:decoration-[color:var(--link)]"
            >
              {t.org}
            </a>
            {t.trail}
          </p>
        ))}
      </div>


      <p className="mt-8 text-[17px] leading-relaxed text-ink-soft">
        taking baby steps with{" "}
        <a
          href={`https://${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link transition-colors hover:text-link-hover"
        >
          open source
        </a>
        .
      </p>

      <blockquote className="mt-8 border-l border-hairline pl-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        {asides.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </blockquote>
    </section>
  );
}