import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="pt-20 pb-12 sm:pt-28 sm:pb-10">
      <p className="text-sm font-mono text-ink-soft mb-5">👋 hey, I&apos;m</p>

      <h1 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight text-ink leading-[1.1]">
        {profile.name}
      </h1>

      <p className="mt-3 font-display text-lg sm:text-xl text-signal font-medium">
        {profile.role}
      </p>

      <p className="mt-3 max-w-[52ch] text-base sm:text-lg text-ink-soft leading-relaxed">
        {profile.bio}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-mono">
        <a
          href="/AdarshSinghTomarResume.pdf"
          download
          className="inline-flex items-center gap-1.5 rounded-md border border-ink text-ink px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors"
        >
          Download resume ↓
        </a>
      </div>
    </section>
  );
}
