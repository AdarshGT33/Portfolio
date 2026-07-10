import Hero from "@/components/Hero";
import InfoGrid from "@/components/InfoGrid";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-page px-6 sm:px-0">
      <Hero />
      <InfoGrid />
      <Projects />
      <Footer />
    </main>
  );
}
