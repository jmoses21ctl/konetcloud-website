import Link from "next/link";

import { cn } from "@/lib/utils";

type MarkProps = React.SVGProps<SVGSVGElement> & {
  /** Use a unique id when the mark appears more than once on a page. */
  id?: string;
};

/**
 * KonetCloud logomark. A cloud built from three tangent circles with a
 * negative-space "K" whose strokes read as network edges ending in nodes.
 * Inline so the gradient is crisp at any size and can be recoloured via mask.
 */
export function KonetMark({ id = "kc", className, ...props }: MarkProps) {
  const grad = `${id}-g`;
  const mask = `${id}-m`;
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={grad}
          x1="6"
          y1="8"
          x2="36"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD86B" />
          <stop offset=".5" stopColor="#F5B400" />
          <stop offset="1" stopColor="#E07B12" />
        </linearGradient>
        <mask id={mask}>
          <rect width="40" height="40" fill="#fff" />
          <path
            d="M16.5 14v13M16.5 20.5 24.5 14M16.5 20.5 24.5 27"
            stroke="#000"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="#000">
            <circle cx="16.5" cy="14" r="2.1" />
            <circle cx="16.5" cy="27" r="2.1" />
            <circle cx="24.5" cy="14" r="2.1" />
            <circle cx="24.5" cy="27" r="2.1" />
            <circle cx="16.5" cy="20.5" r="2.1" />
          </g>
        </mask>
      </defs>
      <g fill={`url(#${grad})`} mask={`url(#${mask})`}>
        <circle cx="13" cy="24" r="7" />
        <circle cx="21" cy="18" r="9.5" />
        <circle cx="29" cy="24.5" r="6.5" />
        <rect x="13" y="24" width="16" height="7" />
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Hide the wordmark, e.g. in compact headers. */
  markOnly?: boolean;
};

/** Mark + wordmark lockup, linked to the homepage. */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="KonetCloud home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-sm",
        className,
      )}
    >
      <KonetMark className="size-8 transition-transform duration-500 ease-out-expo group-hover:-translate-y-px group-hover:rotate-[-4deg]" />
      {!markOnly && (
        <span className="text-[1.125rem] font-bold leading-none tracking-[-0.035em] text-paper">
          Konet
          <span className="font-medium text-paper-2 transition-colors duration-300 group-hover:text-paper">
            Cloud
          </span>
        </span>
      )}
    </Link>
  );
}
