import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
// Робот временно скрыт (компонент сохранён, вернём позже):
// import { RobotShowcase } from "@/components/robot-showcase";
import { Marquee } from "@/components/marquee";
import { Skills } from "@/components/skills";
import { Plans } from "@/components/plans";
import { How } from "@/components/how";
import { Works } from "@/components/works";
import { Team } from "@/components/team";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { RevealController } from "@/components/reveal-controller";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        {/* <RobotShowcase /> — временно скрыт */}
        <Marquee />
        <Skills />
        <Works />
        <Plans />
        <How />
        <Team />
        <Cta />
      </main>
      <Footer />
      <RevealController />
    </>
  );
}
