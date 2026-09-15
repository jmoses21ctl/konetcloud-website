import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
  align?: "left" | "center";
};

/** Inner-page section: numbered heading + content, with the standard rhythm. */
export function Section({
  index,
  eyebrow,
  title,
  description,
  children,
  id,
  className,
  align,
}: Props) {
  return (
    <section id={id} className={cn("relative bg-ink py-16 md:py-24", className)}>
      <div className="container-x">
        <Reveal variant={align === "center" ? "up" : "left"}>
          <SectionHeading
            index={index}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
          />
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
