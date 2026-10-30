// All portfolio content lives here so it's easy to update without touching components.

export const profile = {
  name: "Adarsh Singh Tomar",
  role: "AI/ML Engineer",
  location: "Bengaluru, Karnataka, India",
  // Used by <LocalTime /> to compute distance + time skew from the visitor.
  homeCity: "Bengaluru",
  homeCoords: [12.9716, 77.5946] as [number, number],
  homeTimeZone: "Asia/Kolkata",
  // TODO: replace with your real contact details before deploying
  email: "tomaradarsh18@gmail.com",
  linkedin: "www.linkedin.com/in/adarsh-singh-tomar-46b6451bb/",
  github: "github.com/AdarshGT33",
  githubUser: "AdarshGT33",
  bio: "Started as a web developer and grew preference for backend. Now I'm building complex and challenging back-end and AI systems in production.",
};

/** Top nav. `key` is the single-letter keyboard shortcut shown in brackets. */
export const nav = [
  { key: "h", label: "home", href: "home" },
  { key: "p", label: "projects", href: "projects" },
  { key: "w", label: "work", href: "work" },
];

/** The "currently / co-founded / prev" lines under the bio. */
export const timeline = [
  {
    lead: "currently leading AI product deveolopment at",
    org: "Suraksha Lens",
    href: "https://www.saicjs.com/suraksha-lens-1",
    trail: ", as AI/ML consultant",
  },
  {
    lead: "prev AI Creative Technologist at",
    org: "BackkBenchers",
    href: "https://backkbenchers.in/#",
  },
  {
    lead: "prev AI Research Engineer at",
    org: "Ekanga",
    href: "https://www.ekanga.in/",
  },
];

// TODO: rewrite in your own words — this is a placeholder in psudokit's shape.
export const asides = [
  "I flourish in a high agency environment, undivided attention, I doubt doubt, and I talk to myself out loud often, awfully lot",
  "also music/movies/sports · want to afford going to swimming.",
];

export const projects = [
  {
    name: "Haha Ok",
    dates: "2026",
    repo: "https://github.com/AdarshGT33/haha-ok",
    demo: "https://haha-ok.vercel.app",
    stack: ["Next.js", "Clerk", "Supabase", "Groq"],
  },
  {
    name: "Cyber-Incident Post-mortem Assistant",
    dates: "Apr – May 2026",
    repo: "https://github.com/AdarshGT33/cyber-postmortem-assistant",
    stack: ["FastAPI", "asyncio", "aiosqlite", "Ollama", "Pydantic v2"],
  },
  {
    name: "Competitor Research MCP",
    dates: "Feb – Mar 2026",
    repo: "https://github.com/AdarshGT33/competitor_research_mcp",
    stack: ["Python", "LangGraph", "MCP", "SQLite", "Ollama"],
  },
];

/**
 * The scattered wall above the GitHub graph.
 * Drop images into public/collage/ and add entries. `tilt` is degrees —
 * keep them small (-8..8) or the wall reads as noise.
 */
export type CollageItem =
  | { kind: "photo"; src: string; alt: string; tilt: number; width: number }
  | { kind: "note"; text: string; tilt: number; tone?: "ink" | "signal" };

export const collage: CollageItem[] = [
  { kind: "photo", src: "/collage/kobe.jpg", alt: "Kobe Bryant at the free-throw line", tilt: 4, width: 168 },
  { kind: "photo", src: "/collage/identity.jpg", alt: "On building an identity rooted in yourself", tilt: -5, width: 170 },
  { kind: "photo", src: "/collage/opportunities.jpg", alt: "How to see opportunities others miss", tilt: 3, width: 150 },
  { kind: "photo", src: "/collage/tomorrow.jpg", alt: "It could all end tomorrow, or it could last another 100 years", tilt: -3, width: 160 },
  { kind: "photo", src: "/collage/creativity.jpg", alt: "On creativity being destructive as much as constructive", tilt: 4, width: 165 },
  { kind: "photo", src: "/collage/emotions.jpg", alt: "Not everything I feel is true", tilt: -4, width: 155 },
  { kind: "photo", src: "/collage/discomfort.jpg", alt: "You are strong enough to face the discomfort you are avoiding", tilt: 5, width: 158 },
  { kind: "photo", src: "/collage/philippians.jpg", alt: "Philippians 4:5-9", tilt: 2, width: 175 },
  { kind: "photo", src: "/collage/ichigo_mog.jpg", alt: "Ichigo Kurosaki in the Bleach: Thousand-Year Blood War coat", tilt: -3, width: 150 },
  { kind: "photo", src: "/collage/moving-man.jpg", alt: "A moving man eventually meets his luck", tilt: 4, width: 165 },
  { kind: "photo", src: "/collage/tired-either-way.jpg", alt: "You will be tired either way — be tired from trying", tilt: -5, width: 160 },
  { kind: "photo", src: "/collage/bleach-spread.jpg", alt: "Bleach cast colour spread", tilt: 3, width: 158 },
  { kind: "photo", src: "/collage/brings-me-joy.jpg", alt: "If it doesn't bring me joy, spark my curiosity or expand my world, I'm not doing it", tilt: -4, width: 162 },
  { kind: "photo", src: "/collage/act-without-reward.jpg", alt: "Do as your heart desires and act without thinking of reward", tilt: 5, width: 168 },
  { kind: "photo", src: "/collage/repetitive-courage.jpg", alt: "A creative career requires repetitive courage", tilt: -2, width: 152 },
  { kind: "photo", src: "/collage/do-it-matrix.jpg", alt: "Do it fast or slow, well or badly — what each quadrant gives you", tilt: 4, width: 170 },
  { kind: "photo", src: "/collage/yearning.jpg", alt: "No rigid rules for a vocation, only the yearning to participate in the work", tilt: -5, width: 156 },
];
