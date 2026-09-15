import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  title: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Mono label at the top-right, e.g. a family short name. */
  tag?: string;
  /** Trailing action text; defaults to no text, just the arrow. */
  action?: string;
  className?: string;
  children?: React.ReactNode;
};

/** The one card used across overview grids. Spotlight + lift on hover. */
export function LinkCard({
  href,
  title,
  description,
  icon: Icon,
  tag,
  action,
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "spotlight group relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-line bg-ink-2 p-5 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong sm:p-6",
        className,
      )}
    >
      {(Icon || tag) && (
        <div className="flex items-start justify-between">
          {Icon ? (
            <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-ink text-paper-2 transition-[color,border-color,box-shadow] duration-500 group-hover:border-brand/40 group-hover:text-brand group-hover:shadow-[0_0_24px_-6px_rgb(2_164_238/0.6)]">
              <Icon className="size-5" />
            </span>
          ) : (
            <span />
          )}
          {tag && (
            <span className="font-mono text-[10px] tracking-[0.12em] text-paper-3/70 uppercase">
              {tag}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.02em] text-paper">
          {title}
          <ArrowUpRight className="size-3.5 text-paper-3 opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </h3>
        <p className="text-[14px] leading-relaxed text-paper-2">{description}</p>
      </div>
      {children}
      {action && (
        <span className="text-[13px] font-medium text-brand">{action}</span>
      )}
    </Link>
  );
}
