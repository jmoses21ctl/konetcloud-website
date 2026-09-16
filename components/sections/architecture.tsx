import { availabilityZones } from "@/lib/trust";
import { cn } from "@/lib/utils";

const capabilities = [
  "Compute & GPU",
  "Storage",
  "Network Services",
  "Security Services",
  "Big Data",
  "Platform Services",
];

const operations = [
  "Monitoring",
  "Logging",
  "Resource Management",
  "Backup & Recovery",
  "Usage & Billing",
  "Time Services",
];

/**
 * KonetCloud Multi-Site Availability Architecture — the single public
 * architecture visual. Logical only: layers, three peer zones and redundant
 * inter-zone paths. No devices, addresses, ports or partner names.
 */
export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "elevated rounded-2xl border border-line bg-surface-2 p-4 sm:p-6",
        className,
      )}
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-2 font-mono text-[12.5px] tracking-[0.12em] text-fg-3 uppercase">
        <span>KonetCloud Multi‑Site Availability Architecture</span>
        <span>Logical view</span>
      </figcaption>

      <div className="mt-5 flex flex-col gap-3">
        <Layer label="Users & Connectivity" items={["Customers", "Users", "Enterprise connectivity", "Internet"]} />
        <Down />
        <Layer label="Traffic Distribution" items={["Health-based distribution across healthy zones"]} accent />
        <Down />

        {/* Zones with redundant paths */}
        <div className="relative">
          {/* Arc: zone 1 ↔ zone 3, so no zone is a middle dependency */}
          <div className="relative hidden h-12 md:block" aria-hidden="true">
            <svg
              viewBox="0 0 1000 48"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <path
                id="az-arc"
                d="M167 48 C 167 -10, 833 -10, 833 48"
                fill="none"
                stroke="rgb(0 126 237 / 0.4)"
                strokeWidth="1"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <circle r="3" fill="#007EED">
                <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#az-arc" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#FFC531">
                <animateMotion dur="5s" begin="2.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                  <mpath href="#az-arc" />
                </animateMotion>
              </circle>
            </svg>
          </div>

          <div className="relative">
            {/* Straight paths: zone 1 ↔ 2 ↔ 3 (visible only in the gaps) */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[16%] top-1/2 hidden h-px overflow-hidden bg-[repeating-linear-gradient(90deg,rgb(0_126_237/0.4)_0_4px,transparent_4px_8px)] md:block"
            >
              <span className="animate-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand to-transparent" />
            </div>

            <ol className="grid gap-3 md:grid-cols-3">
              {availabilityZones.map((z, i) => (
                <li
                  key={z.id}
                  className="stagger relative flex flex-col gap-4 rounded-xl border border-line bg-surface p-4"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[12px] tracking-[0.12em] text-brand uppercase">
                        {z.label}
                      </p>
                      <h4 className="mt-1 text-[17px] font-semibold tracking-[-0.01em] text-fg">
                        {z.name}
                      </h4>
                    </div>
                    <span className="relative mt-1 flex size-1.5">
                      <span className="animate-pulse-dot absolute inset-0 rounded-full bg-lime" />
                      <span className="relative size-1.5 rounded-full bg-lime" />
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {capabilities.map((c) => (
                      <li
                        key={c}
                        className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[13px] text-fg-2"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-[12px] tracking-[0.1em] text-fg-3 uppercase">
                    Key services
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-3 text-center font-mono text-[12.5px] text-fg-3 md:hidden">
            Every zone connects to every other zone over redundant paths.
          </p>
        </div>

        <Down />
        <Layer label="Management & Operations" items={operations} />
      </div>
    </figure>
  );
}

function Layer({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        accent ? "border-brand/30 bg-brand/[0.05]" : "border-line bg-surface",
      )}
    >
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-fg">
        {label}
      </span>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12.5px] text-fg-3">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function Down() {
  return (
    <div aria-hidden="true" className="flex justify-center">
      <span className="h-4 w-px bg-gradient-to-b from-line-strong to-brand/60" />
    </div>
  );
}
