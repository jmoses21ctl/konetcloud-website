import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Availability } from "@/components/sections/availability";
import { CallToAction } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Infrastructure } from "@/components/sections/infrastructure";
import { LocalControl } from "@/components/sections/local-control";
import { Pillars } from "@/components/sections/pillars";
import { Pricing } from "@/components/sections/pricing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Infrastructure />
        <Availability />
        <LocalControl />
        <Pillars />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
