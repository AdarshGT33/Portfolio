// All portfolio content lives here: the pages render it, and the chatbot
// (app/api/chat) reads the same data, so updating it here updates both.

export const profile = {
  name: "Adarsh Singh Tomar",
  role: "AI/ML Engineer",
  location: "Bengaluru, Karnataka, India",
  // Used by <LocalTime /> to compute distance + time skew from the visitor.
  homeCity: "Bengaluru",
  homeCoords: [12.9716, 77.5946] as [number, number],
  homeTimeZone: "Asia/Kolkata",
  email: "tomaradarsh18@gmail.com",
  linkedin: "www.linkedin.com/in/adarsh-singh-tomar-46b6451bb/",
  github: "github.com/AdarshGT33",
  githubUser: "AdarshGT33",
  bio: "Started as a web developer and grew a preference for backend. Now I'm building complex and challenging back-end and AI systems in production.",
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
    lead: "currently leading AI product development at",
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

export const asides = [
  "I flourish in a high agency environment, undivided attention, I doubt doubt, and I talk to myself out loud often, an awful lot",
  "also music/movies/sports · want to afford going to swimming.",
];

/** Projects page, in display order. */
export type Project = {
  id: string; name: string; status: string; tagline: string;
  /** Three bullets: name what was built, say what it solved, carry a real number. */
  availability?: string; story: string[]; links: { label: string; href: string }[];
};

export const projects: Project[] = [
  { id: "onvice", name: "Onvice", status: "In progress, runs locally",
    tagline: "Deploy a public GitHub repo from one API call.",
    story: [
      "Built a Go platform that turns a public GitHub repo into a live app at its own HTTPS subdomain. No Dockerfile needed: it detects 4 stacks (Node, Python, Go, static), writes one, builds the image and runs it in a capped container.",
      "A deploy that takes the site down is worse than no deploy. The new container must pass a health check before traffic moves to it, so 291 of 291 requests succeeded during a live redeploy, and a rollback reuses the previous image to be live again in 4 seconds.",
      "Postgres is both the job queue and the referee. Each job is leased for 15 minutes so a dead worker's build comes back, and unique indexes allow one deploy in flight per app: fire 5 redeploys at once and exactly 1 gets in.",
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

/** Work page, newest first. */
export type Job = {
  id: string; company: string; role: string; dates: string;
  /** Two or three bullets: name what was built, say what it solved, carry a real number. */
  summary: string[]; logo?: string; link?: { label: string; href: string };
};

export const jobs: Job[] = [
  { id: "job-1", company: "Suraksha Lens", role: "AIML Engineer", dates: "July 2026 to now",
    summary: [
      "The dashboard holds 4 layers of climate and crime data across 650+ districts (India and Sri Lanka), but you had to know where to look. With the AI assistant chatbot (built from scratch), you can now ask a question in plain words and get reliable answers back, any district, any year.",
      "You can speak instead of typing, in any of seven regional languages, and it works out which one you used. Built a benchmark harness that checks speaking gets you the same answer as typing, holding transcription error near 2%.",
    ],
    link: { label: "Suraksha Lens", href: "https://www.saicjs.com/suraksha-lens-1" } },
  { id: "job-2", company: "BackkBenchers", role: "AI Creative Technologist", dates: "Jan 2026 to Mar 2026",
    summary: [
      "Video ads cost more than these brands could spend. Built a prompt-to-video pipeline — Gemini for the storyline, Veo 3.0 for the shots — that turned out 60+ finished ads at 2–3 a day.",
      "Volume only helps if the work doesn't come back. Brand voice went into the prompts themselves, so ads shipped with almost no revision rounds and pulled 3K–17K organic views a post.",
    ],
    link: { label: "BackkBenchers", href: "https://backkbenchers.in/#" } },
  { id: "job-3", company: "Ekanga", role: "AI Research Intern", dates: "Sep 2025 to Dec 2025",
    summary: [
      "An avatar that looks different every run can't carry a product. The multi-modal AI avatar system I built with the CEO holds one identity through a prompt refinement pipeline; inconsistencies down 30%, iteration time down 25%.",
      "Fidelity was the blocker. 700+ prompts tuned across Stable Diffusion, Midjourney and Gemini lifted visual quality 40% over baseline, and settled which models the system runs on.",
    ],
    link: { label: "Ekanga", href: "https://www.ekanga.in/"} },
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
