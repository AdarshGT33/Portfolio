import Hero from "@/components/Hero";
import InfoGrid from "@/components/InfoGrid";
import Projects from "@/components/Projects";
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
