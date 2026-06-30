import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { getLanding, landingMetadata } from "@/lib/landings";

const SLUG = "sozdanie-saytov-bishkek";

export const metadata: Metadata = landingMetadata(getLanding(SLUG)!);

export default function Page() {
  return <LandingPage slug={SLUG} />;
}
