import { KonetMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { sovereigntyWording } from "@/lib/trust";

export function LocalControl() {
  return (
    <section id="local-control" className="relative bg-surface-3 pb-24 md:pb-32">
      <div className="container-x">
        <Reveal
          variant="scale"
          className="elevated relative isolate overflow-hidden rounded-3xl border border-line bg-surface-2 px-6 py-14 sm:px-12 md:py-20"
        >
          <KonetMark
            className="animate-float absolute -right-24 -bottom-24 -z-10 w-[18rem] opacity-[0.1] md:-right-8 md:w-[22rem]"
          />
          <div className="absolute inset-x-0 top-0 -z-10 h-1 bg-gradient-to-r from-gold-soft via-gold to-gold-deep" />

          <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-end">
            <SectionHeading
              index="03"
              eyebrow="Local control"
              title="Cloud infrastructure with local control"
              description="Run workloads on infrastructure designed to support Nigerian data-residency, operational-control and regulatory requirements. KonetCloud gives enterprises and public-sector organisations a local cloud foundation for applications and data that require greater control over where infrastructure and information reside."
            />
            <div className="flex flex-col gap-6 lg:items-end">
              <p
                className="stagger max-w-sm border-l border-brand/40 pl-4 text-[15px] leading-relaxed text-fg-2 lg:text-right lg:border-l-0 lg:border-r lg:pr-4 lg:pl-0"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                {sovereigntyWording}
              </p>
              <div
                className="stagger-pop"
                style={{ "--i": 6 } as React.CSSProperties}
              >
                <Button href="/solutions/sovereign-cloud" arrow>
                  Explore Sovereign Cloud
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
