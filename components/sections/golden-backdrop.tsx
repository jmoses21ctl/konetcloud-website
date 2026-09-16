import { cn } from "@/lib/utils";

/**
 * The KonetCloud "atmosphere": a warm gold gradient with halftone spheres
 * and fine wave lines, echoing the Console's login backdrop. Pure SVG/CSS
 * so it scales to any viewport and prints crisp.
 */
export function GoldenBackdrop({
  className,
  fadeBottom = false,
}: {
  className?: string;
  /** Dissolve into the page surface along the bottom edge. */
  fadeBottom?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[linear-gradient(112deg,#FFE27A_0%,#FFC531_42%,#FFAF2A_72%,#FF9A1F_100%)]",
        className,
      )}
    >
      {/* light haze top-left, warmth bottom-right */}
      <div className="absolute -top-40 -left-40 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.55),transparent)]" />
      <div className="absolute -right-40 -bottom-60 h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_140_20/0.45),transparent)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="gb-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="13" cy="13" r="5.5" fill="#fff" />
          </pattern>
          <pattern id="gb-dots-sm" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="3" fill="#fff" />
          </pattern>
          {/* Sphere shading: dots fade toward the rim so the disc reads as a globe */}
          <radialGradient id="gb-sphere" cx="38%" cy="35%" r="62%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="gb-mask-a">
            <circle cx="260" cy="560" r="560" fill="url(#gb-sphere)" />
          </mask>
          <mask id="gb-mask-b">
            <circle cx="1400" cy="120" r="330" fill="url(#gb-sphere)" />
          </mask>
          <mask id="gb-mask-c">
            <circle cx="1120" cy="980" r="420" fill="url(#gb-sphere)" />
          </mask>
        </defs>

        {/* halftone spheres */}
        <rect width="1600" height="900" fill="url(#gb-dots)" mask="url(#gb-mask-a)" opacity="0.85" />
        <rect width="1600" height="900" fill="url(#gb-dots-sm)" mask="url(#gb-mask-b)" opacity="0.7" />
        <rect width="1600" height="900" fill="url(#gb-dots)" mask="url(#gb-mask-c)" opacity="0.75" />

        {/* wave lines — a ribbon of fine parallel curves */}
        <g fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1">
          {Array.from({ length: 22 }, (_, i) => (
            <path
              key={i}
              d={`M-100 ${260 + i * 9} C 300 ${120 + i * 11}, 520 ${560 - i * 6}, 900 ${300 + i * 8} S 1500 ${60 + i * 12}, 1750 ${360 + i * 9}`}
            />
          ))}
        </g>
        <g fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1">
          {Array.from({ length: 16 }, (_, i) => (
            <path
              key={i}
              d={`M-100 ${640 + i * 10} C 420 ${520 + i * 8}, 700 ${840 - i * 5}, 1100 ${600 + i * 9} S 1500 ${420 + i * 10}, 1750 ${700 + i * 8}`}
            />
          ))}
        </g>
      </svg>

      {fadeBottom && (
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-surface" />
      )}
    </div>
  );
}
