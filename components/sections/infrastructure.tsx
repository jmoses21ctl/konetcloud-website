import { LinkCard } from "@/components/ui/link-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { productFamilies } from "@/lib/products";

/** Homepage product grid — one card per family, eight in a 4×2. */
export function Infrastructure() {
  return (
    <section id="products" className="relative bg-ink py-24 md:py-32">
      <div className="container-x">
        <Reveal variant="left">
          <SectionHeading
            index="01"
            eyebrow="Cloud infrastructure"
            title="Cloud infrastructure built for critical workloads"
            description="From virtual machines and storage to networking, data and GPU acceleration, KonetCloud provides the infrastructure required to build, migrate and operate modern applications."
          />
        </Reveal>

        <Reveal variant="up" index={1}>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {productFamilies.map((f, i) => (
              <li
                key={f.slug}
                className="stagger-pop"
                style={{ "--i": i } as React.CSSProperties}
              >
                <LinkCard
                  href={`/products/${f.slug}`}
                  title={f.name}
                  description={f.summary}
                  icon={f.icon}
                  tag={`${f.services.length} services`}
                  action={`Explore ${f.name}`}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
