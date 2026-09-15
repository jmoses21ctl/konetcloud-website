import { KonetMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

type Props = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing band, reusable on every page with page-specific copy. */
export function CallToAction({
  eyebrow = "Get started",
  title = "Build on KonetCloud.",
  copy = "Start in the console, or talk to an engineer about architecture, migration and commercial terms.",
  primary = { label: "Start building", href: site.links.console },
  secondary = { label: "Talk to an expert", href: site.links.sales },
}: Props) {
  return (
    <section className="relative bg-ink pb-24 md:pb-32">
      <div className="container-x">
        <Reveal
          variant="pop"
          className="relative isolate overflow-hidden rounded-3xl border border-line bg-ink-2 px-6 py-16 text-center sm:px-12 md:py-24"
        >
          <KonetMark
            id="cta-mark"
            className="animate-float absolute -right-16 -bottom-24 -z-10 size-[22rem] opacity-[0.07] md:-right-8 md:size-[30rem]"
          />
          <div className="absolute inset-x-12 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <p
            className="stagger font-mono text-[11.5px] tracking-[0.12em] text-brand uppercase"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            {eyebrow}
          </p>
          <h2
            style={{ "--i": 1 } as React.CSSProperties}
            className="stagger mx-auto mt-4 max-w-2xl text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          <p
            style={{ "--i": 2 } as React.CSSProperties}
            className="stagger mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-paper-2"
          >
            {copy}
          </p>
          <div
            style={{ "--i": 3 } as React.CSSProperties}
            className="stagger-pop mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" href={primary.href} arrow>
              {primary.label}
            </Button>
            <Button size="lg" variant="secondary" href={secondary.href}>
              {secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
