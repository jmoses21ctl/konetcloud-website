import { AiIcon, CloudNetworkIcon, NetworkIcon, StackIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    icon: NetworkIcon,
    title: "Local infrastructure",
    copy: "Cloud infrastructure located close to the businesses, institutions and users it serves.",
  },
  {
    icon: CloudNetworkIcon,
    title: "Built for availability",
    copy: "Multi-zone architecture and redundant connectivity designed for resilient workloads.",
  },
  {
    icon: AiIcon,
    title: "AI-ready infrastructure",
    copy: "CPU and GPU infrastructure for traditional applications and accelerated computing.",
  },
  {
    icon: StackIcon,
    title: "Built for enterprise",
    copy: "Infrastructure, networking, data and operational capabilities for business-critical workloads.",
  },
];

export function Pillars() {
  return (
    <section id="why" className="relative bg-surface py-24 md:py-32">
      <div className="container-x">
        <Reveal variant="up">
          <SectionHeading
            index="04"
            eyebrow="Why KonetCloud"
            title="One platform. Four reasons it holds up."
            align="center"
          />
        </Reveal>
        <Reveal
          as="ul"
          variant="up"
          index={1}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="stagger group flex flex-col gap-5 bg-surface p-6 transition-colors duration-500 hover:bg-fg/[0.025] sm:p-7"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface-2 text-fg-2 transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                <p.icon className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[12px] tracking-[0.12em] text-fg-3 uppercase">
                  0{i + 1}
                </span>
                <h3 className="text-[18px] font-bold tracking-[-0.015em] text-fg">
                  {p.title}
                </h3>
                <p className="text-[16px] leading-relaxed text-fg-2">{p.copy}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
