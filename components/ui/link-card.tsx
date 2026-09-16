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
        "spotlight elevated group relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-line bg-surface-2 p-5 transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-brand/30 sm:p-6",
        className,
      )}
    >
      {(Icon || tag) && (
        <div className="flex items-start justify-between">
          {Icon ? (
            <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-2 transition-[color,border-color,box-shadow] duration-500 group-hover:border-brand/40 group-hover:text-brand group-hover:shadow-[0_0_24px_-6px_rgb(245_180_0/0.6)]">
              <Icon className="size-5" />
            </span>
          ) : (
            <span />
          )}
          {tag && (
            <span className="font-mono text-[10px] tracking-[0.12em] text-fg-3/70 uppercase">
              {tag}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.02em] text-fg">
          {title}
          <ArrowUpRight className="size-3.5 text-fg-3 opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </h3>
        <p className="text-[14px] leading-relaxed text-fg-2">{description}</p>
      </div>
      {children}
      {action && (
        <span className="text-[13px] font-medium text-brand">{action}</span>
      )}
    </Link>
  );
}
