import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CherryBlossom from "@/components/CherryBlossom";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Adarsh Singh Tomar — AI/ML Engineer & Agentic Workflows",
  description:
    "Adarsh Singh Tomar builds AI/ML systems, backend infra, and agentic tools — currently building multilingual voice AI at Suraksha Lens.",
};

// Runs before first paint: picks the stored choice, else the OS preference.
// Without this the page paints dark then flips, which is worse than either theme.
const THEME_INIT = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {/* Chrome lives in the layout, so petals, nav and footer survive route changes
            and every page lands in the same 760px column. Only {children} swaps. */}
        <CherryBlossom />
        {/* Gutter until the viewport is wider than the 760px column -- with
            sm:px-0 the text went flush to the edge on every screen in between. */}
        <main id="top" className="mx-auto flex min-h-screen max-w-page flex-col px-6 min-[800px]:px-0">
          <Nav />
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
