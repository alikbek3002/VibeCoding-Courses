import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Skills } from "@/components/skills";
import { Plans } from "@/components/plans";
import { How } from "@/components/how";
import { Works } from "@/components/works";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { RevealController } from "@/components/reveal-controller";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Skills />
        <Plans />
        <How />
        <Works />
        <Cta />
      </main>
      <Footer />
      <RevealController />
    </>
  );
}
