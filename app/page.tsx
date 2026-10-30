import Hero from "@/components/Hero";
import Collage from "@/components/Collage";
import GitHubGraph from "@/components/GitHubGraph";
import LocalTime from "@/components/LocalTime";

export default function Home() {
  return (
    <>
      <Hero />
      <Collage />
      <GitHubGraph />
      <LocalTime />
    </>
  );
}
