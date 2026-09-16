/**
 * Minimal isometric toolkit for the hero illustrations.
 * World space: x runs down-right, y runs down-left, z is up. One unit = 1px.
 * Everything is plain SVG so it prints, scales and animates without a runtime.
 */

const CX = 0.866; // cos 30°
const SY = 0.5; // sin 30°

export type P3 = [number, number, number];

/** Project a 3D point to screen space. */
export function iso([x, y, z]: P3): [number, number] {
  return [(x - y) * CX, (x + y) * SY - z];
}

const pts = (list: P3[]) => list.map((p) => iso(p).join(",")).join(" ");

/* ---------- colour helpers ---------- */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(hex: string, to: [number, number, number], t: number) {
  const [r, g, b] = hexToRgb(hex);
  const m = (a: number, b2: number) => Math.round(a + (b2 - a) * t);
  return `rgb(${m(r, to[0])} ${m(g, to[1])} ${m(b, to[2])})`;
}
/** Three-face shading from one base colour. */
export function shade(base: string) {
  return {
    top: mix(base, [255, 255, 255], 0.34),
    left: base,
    right: mix(base, [0, 0, 0], 0.42),
    edge: mix(base, [255, 255, 255], 0.6),
  };
}

/* ---------- primitives ---------- */
type BoxProps = {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  color: string;
  /** Show a lighter top edge highlight. */
  edge?: boolean;
  opacity?: number;
  className?: string;
};

/** Extruded rectangle. Draws top, left (y+d) and right (x+w) faces. */
export function Box({ x, y, z = 0, w, d, h, color, edge = true, opacity, className }: BoxProps) {
  const c = shade(color);
  const top: P3[] = [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]];
  const left: P3[] = [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]];
  const right: P3[] = [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]];
  return (
    <g opacity={opacity} className={className}>
      <polygon points={pts(left)} fill={c.left} />
      <polygon points={pts(right)} fill={c.right} />
      <polygon points={pts(top)} fill={c.top} />
      {edge && (
        <polyline
          points={pts([[x, y + d, z + h], [x + w, y + d, z + h], [x + w, y, z + h]])}
          fill="none"
          stroke={c.edge}
          strokeOpacity={0.75}
          strokeWidth={1}
        />
      )}
    </g>
  );
}

type CylProps = {
  x: number;
  y: number;
  z?: number;
  r: number;
  h: number;
  color: string;
  id: string;
  className?: string;
  opacity?: number;
};

/** Extruded circle with a horizontal gradient for the curved face. */
export function Cylinder({ x, y, z = 0, r, h, color, id, className, opacity }: CylProps) {
  const c = shade(color);
  const rx = r * 1.2247;
  const ry = r * 0.7071;
  const [cx, cyTop] = iso([x, y, z + h]);
  const [, cyBot] = iso([x, y, z]);
  const side = `M${cx - rx},${cyTop} A${rx},${ry} 0 0 0 ${cx + rx},${cyTop} L${cx + rx},${cyBot} A${rx},${ry} 0 0 1 ${cx - rx},${cyBot} Z`;
  return (
    <g className={className} opacity={opacity}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor={c.left} />
          <stop offset="0.55" stopColor={c.right} />
          <stop offset="1" stopColor={c.left} stopOpacity={0.85} />
        </linearGradient>
      </defs>
      <path d={side} fill={`url(#${id})`} />
      <ellipse cx={cx} cy={cyTop} rx={rx} ry={ry} fill={c.top} />
      <ellipse cx={cx} cy={cyTop} rx={rx} ry={ry} fill="none" stroke={c.edge} strokeOpacity={0.7} strokeWidth={1} />
    </g>
  );
}

/** Flat isometric slab on the floor — used for glass tiles and pads. */
export function Tile({ x, y, z = 0, w, d, fill, stroke, opacity = 1, className }: { x: number; y: number; z?: number; w: number; d: number; fill: string; stroke?: string; opacity?: number; className?: string }) {
  return (
    <polygon
      points={pts([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]])}
      fill={fill}
      stroke={stroke}
      strokeWidth={0.75}
      opacity={opacity}
      className={className}
    />
  );
}

/** Faint floor grid, fading toward the edges. */
export function Floor({ size = 312, step = 24, opacity = 0.16 }: { size?: number; step?: number; opacity?: number }) {
  const lines: React.ReactNode[] = [];
  for (let i = -size; i <= size; i += step) {
    lines.push(<polyline key={`a${i}`} points={pts([[i, -size, 0], [i, size, 0]])} />);
    lines.push(<polyline key={`b${i}`} points={pts([[-size, i, 0], [size, i, 0]])} />);
  }
  return (
    <g fill="none" stroke="#FFD86B" strokeOpacity={opacity} strokeWidth={0.5} mask="url(#iso-fade)">
      {lines}
    </g>
  );
}

/** Small emissive dot (LED / node). */
export function Led({ p, color = "#7AB800", r = 2.1, pulse = false }: { p: P3; color?: string; r?: number; pulse?: boolean }) {
  const [cx, cy] = iso(p);
  return (
    <g className={pulse ? "iso-led" : undefined}>
      <circle cx={cx} cy={cy} r={r * 3} fill={color} opacity={0.22} />
      <circle cx={cx} cy={cy} r={r} fill={color} />
    </g>
  );
}

/** Straight beam between two points with an optional travelling packet. */
export function Beam({ a, b, color = "#FFD86B", opacity = 0.55, packet = false, dur = 3, delay = 0, width = 1.4 }: { a: P3; b: P3; color?: string; opacity?: number; packet?: boolean; dur?: number; delay?: number; width?: number }) {
  const [x1, y1] = iso(a);
  const [x2, y2] = iso(b);
  const d = `M${x1},${y1} L${x2},${y2}`;
  return (
    <g>
      <path d={d} stroke={color} strokeOpacity={opacity} strokeWidth={width} fill="none" />
      {packet && (
        <circle r={2.6} fill="#FFC531">
          <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
        </circle>
      )}
    </g>
  );
}

/** Shared defs: soft floor glow + fade mask. Render once per scene. */
export function SceneDefs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#F5B400" stopOpacity={0.5} />
        <stop offset="0.6" stopColor="#F5B400" stopOpacity={0.12} />
        <stop offset="1" stopColor="#F5B400" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="iso-fade-g" cx="50%" cy="50%" r="50%">
        <stop offset="0.12" stopColor="#fff" />
        <stop offset="0.58" stopColor="#000" />
      </radialGradient>
      <mask id="iso-fade" maskContentUnits="userSpaceOnUse">
        <rect x="-400" y="-400" width="800" height="800" fill="url(#iso-fade-g)" />
      </mask>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
    </defs>
  );
}

/** Frame: centred viewBox, glow, floor. Wrap a scene's content. */
export function Scene({ id, children, className, floor = true, scale = 1, dy = 0 }: { id: string; children: React.ReactNode; className?: string; floor?: boolean; /** Enlarge the content to fill the frame. */ scale?: number; /** Vertical nudge in frame units. */ dy?: number }) {
  return (
    <svg viewBox="-210 -200 420 380" className={className} aria-hidden="true" fill="none">
      <SceneDefs id={id} />
      <ellipse cx="0" cy="50" rx="230" ry="130" fill={`url(#${id}-glow)`} filter={`url(#${id}-blur)`} />
      <g transform={`translate(0 ${dy}) scale(${scale})`}>
        {floor && <Floor />}
        {children}
      </g>
    </svg>
  );
}

/* Palette shortcuts used by scenes */
export const K = {
  chassis: "#2b3a4d",
  chassisDark: "#1c2734",
  slate: "#41546b",
  brand: "#007EED",
  deep: "#0062C4",
  soft: "#66B8FF",
  glass: "rgb(0 126 237 / 0.07)",
  glassLine: "rgb(0 126 237 / 0.35)",
  lime: "#8BC34A",
  cyan: "#29B6F0",
  gold: "#FFC531",
  red: "#F03C2E",
};
