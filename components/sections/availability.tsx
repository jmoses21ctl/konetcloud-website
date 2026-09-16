import { ArchitectureDiagram } from "@/components/sections/architecture";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { availabilityAttributes, availabilityZones } from "@/lib/trust";

export function Availability() {
  return (
    <section id="availability" className="relative bg-surface-3 py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div className="flex flex-col gap-10">
          <Reveal variant="left">
            <SectionHeading
              index="02"
              eyebrow="Availability"
              title="Built for availability"
              description="KonetCloud is designed across multiple availability zones with redundant connectivity and health-based traffic distribution. Deploy applications across independent locations to improve service continuity and reduce dependency on a single infrastructure location."
            />
          </Reveal>

          <Reveal as="ul" variant="up" className="flex flex-col divide-y divide-line border-y border-line">
            {availabilityZones.map((z, i) => (
              <li
                key={z.id}
                className="stagger flex items-center justify-between py-4"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="font-mono text-[11px] tracking-[0.12em] text-fg-3 uppercase">
                  {z.label}
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-fg">
                  {z.name}
                </span>
              </li>
            ))}
          </Reveal>

          <Reveal as="ul" variant="up" index={1} className="flex flex-wrap gap-2">
            {availabilityAttributes.map((a, i) => (
              <li
                key={a}
                className="stagger-pop rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[12.5px] text-fg-2"
                style={{ "--i": i } as React.CSSProperties}
              >
                {a}
              </li>
            ))}
          </Reveal>

          <Reveal variant="up" index={2}>
            <Button variant="secondary" href="/trust" arrow>
              Explore resilience and trust
            </Button>
          </Reveal>
        </div>

        <Reveal variant="right" index={1}>
          <ArchitectureDiagram />
        </Reveal>
      </div>
    </section>
  );
}
