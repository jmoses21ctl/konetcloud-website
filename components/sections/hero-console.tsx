import { availabilityZones } from "@/lib/trust";
import { cn } from "@/lib/utils";

/**
 * A believable slice of the Cloud Console: a provisioning activity log on
 * the left, availability-zone health on the right. No timings, no limits —
 * nothing here is a claim.
 */
export function HeroConsole() {
  return (
    <div className="relative rounded-2xl border border-line bg-ink-2 text-left shadow-[0_0_0_1px_rgb(0_0_0),0_30px_80px_-30px_rgb(245_180_0/0.25)] transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_0_0_1px_rgb(0_0_0),0_30px_80px_-30px_rgb(245_180_0/0.4)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {/* Window chrome */}
      <div className="flex h-11 items-center justify-between border-b border-line px-4 font-mono text-[11.5px] text-paper-3">
        <div className="flex items-center gap-3">
          <span className="text-paper-2">console</span>
          <span className="text-paper-3/60">/</span>
          <span>compute</span>
          <span className="text-paper-3/60">/</span>
          <span>app-web-01</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="animate-pulse-dot absolute inset-0 rounded-full bg-lime" />
            <span className="relative size-1.5 rounded-full bg-lime" />
          </span>
          <span className="hidden sm:inline">activity · live</span>
        </div>
      </div>

      <div className="grid min-w-0 md:grid-cols-[1.6fr_1fr]">
        {/* Activity log */}
        <pre className="min-w-0 overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75] text-paper-2 sm:p-6 sm:text-[13px]">
          <Line prompt index={0}>
            create vm <Arg>app-web-01</Arg> --zone <Arg>lekki</Arg> --family{" "}
            <Arg>general-purpose</Arg>
          </Line>
          <Line dim index={1}>
            → virtual network <Arg>vnet-prod</Arg> · subnet <Arg>web</Arg> … ok
          </Line>
          <Line dim index={2}>
            → block storage volume attached … ok
          </Line>
          <Line dim index={3}>
            → registered with load balancer <Arg>lb-web</Arg> … healthy
          </Line>
          <Line index={4}>
            <Ok>✓</Ok> app-web-01 is <Ok>running</Ok>{" "}
            <span className="text-paper-3">in Availability Zone 2</span>
          </Line>
          <Line prompt index={5}>
            <span className="animate-caret inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-brand" />
          </Line>
        </pre>

        {/* Zone health */}
        <div className="border-t border-line md:border-t-0 md:border-l">
          <div className="flex items-center justify-between px-5 pt-5 pb-3 font-mono text-[11px] tracking-wide text-paper-3 uppercase">
            <span>Availability zones</span>
            <span>health</span>
          </div>
          <ul className="px-2 pb-3">
            {availabilityZones.map((z) => (
              <li
                key={z.id}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium text-paper">{z.name}</span>
                    <span className="font-mono text-[11px] text-paper-3">{z.label}</span>
                  </div>
                </div>
                <span className="font-mono text-[12px] text-lime">healthy</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-5 py-3 font-mono text-[11px] text-paper-3">
            Traffic is distributed to healthy zones
          </div>
        </div>
      </div>
    </div>
  );
}

function Line({
  children,
  prompt = false,
  dim = false,
  index = 0,
}: {
  children: React.ReactNode;
  prompt?: boolean;
  dim?: boolean;
  /** Lines appear in sequence after the hero has settled. */
  index?: number;
}) {
  return (
    <div
      className={cn("animate-line-in flex gap-3", dim && "text-paper-3")}
      style={{ animationDelay: `${900 + index * 260}ms` }}
    >
      <span
        aria-hidden="true"
        className={cn("select-none", prompt ? "text-brand" : "text-transparent")}
      >
        ›
      </span>
      <span>{children}</span>
    </div>
  );
}

function Arg({ children }: { children: React.ReactNode }) {
  return <span className="text-brand-soft">{children}</span>;
}

function Ok({ children }: { children: React.ReactNode }) {
  return <span className="text-lime">{children}</span>;
}
