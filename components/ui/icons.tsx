import type { SVGProps } from "react";

/**
 * Product glyphs, drawn to a 24-unit grid at 1.5px stroke so they sit at
 * the same optical weight as the mono labels beside them.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function ComputeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </svg>
  );
}

export function StorageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7.5 12 4l8 3.5-8 3.5-8-3.5Z" />
      <path d="M4 12l8 3.5 8-3.5M4 16.5 12 20l8-3.5" />
    </svg>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5" r="2.25" />
      <circle cx="5" cy="18" r="2.25" />
      <circle cx="19" cy="18" r="2.25" />
      <path d="m10.9 7 -4.6 9M13.1 7l4.6 9M7.25 18h9.5" />
    </svg>
  );
}

export function KubernetesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
      <path d="M12 8.5v7M8.5 10.5l7 3M15.5 10.5l-7 3" />
    </svg>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="2.75" />
      <path d="M5 6v12c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75V6" />
      <path d="M5 12c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function CloudComputeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18a4 4 0 0 1-.6-7.95A6 6 0 0 1 17.9 9.5 3.75 3.75 0 0 1 17.5 18H7Z" />
      <rect x="10" y="11.5" width="4" height="4" rx="0.75" />
    </svg>
  );
}

export function CloudNetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 16a4 4 0 0 1-.6-7.95A6 6 0 0 1 17.9 7.5 3.75 3.75 0 0 1 17.5 16" />
      <circle cx="12" cy="12" r="1.75" />
      <path d="M12 13.75V21M8 21h8" />
    </svg>
  );
}

export function PaasIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M8 14l2 2-2 2M12.5 18h3" />
    </svg>
  );
}

export function AiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7-5.6-1.9L10.1 9 12 3.5Z" />
      <path d="M18.5 16.5 19.2 18.6l2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z" />
    </svg>
  );
}

export function DeveloperIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m7.5 10 2.5 2.5L7.5 15M12.5 15h4" />
    </svg>
  );
}

export function StackIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="4.5" rx="1" />
      <rect x="4" y="9.75" width="16" height="4.5" rx="1" />
      <rect x="4" y="15.5" width="16" height="4.5" rx="1" />
      <path d="M7 6.25h.01M7 12h.01M7 17.75h.01" strokeWidth="2" />
    </svg>
  );
}

export function OpsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h3.5l2-5 3 10 2.5-7 1.5 2H21" />
    </svg>
  );
}

export function MarketplaceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5 5.5 4.5h13L20 9.5" />
      <path d="M4 9.5a2.65 2.65 0 0 0 5.33 0 2.67 2.67 0 0 0 5.34 0 2.67 2.67 0 0 0 5.33 0" />
      <path d="M5.5 12v7.5h13V12M10 19.5v-4.5h4v4.5" />
    </svg>
  );
}
