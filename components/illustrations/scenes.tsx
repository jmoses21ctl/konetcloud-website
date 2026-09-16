import { Beam, Box, Cylinder, K, Led, Scene, Tile, iso, type P3 } from "@/components/illustrations/iso";

/* Each scene is drawn far-to-near (ascending x+y, then z) so faces overlap correctly. */

export function ComputeScene() {
  const units = [0, 1, 2, 3, 4, 5];
  return (
    <Scene id="compute" scale={1.14} dy={26}>
      {/* pedestal */}
      <Tile x={-70} y={-70} w={140} d={140} fill={K.glass} stroke={K.glassLine} />
      {/* rack units */}
      {units.map((i) => (
        <g key={i}>
          <Box x={-42} y={-42} z={i * 20} w={84} d={84} h={17} color={i % 2 ? K.slate : K.chassis} />
          {/* drive bays on the left face */}
          {[0, 1, 2, 3].map((b) => (
            <Tile key={b} x={-38 + b * 18} y={42.2} z={i * 20 + 5} w={12} d={0.01} fill={K.chassisDark} />
          ))}
          <Led p={[36, 42.5, i * 20 + 9]} color={i === 2 ? K.cyan : K.lime} pulse={i % 3 === 0} />
          <Led p={[30, 42.5, i * 20 + 9]} color={K.brand} r={1.2} />
        </g>
      ))}
      {/* top vent grid */}
      {[-30, -15, 0, 15].map((v) => (
        <Beam key={v} a={[-36, v, 121]} b={[36, v, 121]} color="#000" opacity={0.35} />
      ))}
      {/* floating chip */}
      <g className="iso-float">
        <ellipse cx={0} cy={iso([0, 0, 150])[1] + 30} rx={44} ry={22} fill={K.brand} opacity={0.18} filter="url(#compute-blur)" />
        {/* pins */}
        {[-20, -10, 0, 10, 20].map((p) => (
          <g key={p}>
            <Box x={p - 1.5} y={-30} z={150} w={3} d={4} h={2} color="#9aa1ad" edge={false} />
            <Box x={p - 1.5} y={26} z={150} w={3} d={4} h={2} color="#9aa1ad" edge={false} />
            <Box x={-30} y={p - 1.5} z={150} w={4} d={3} h={2} color="#9aa1ad" edge={false} />
            <Box x={26} y={p - 1.5} z={150} w={4} d={3} h={2} color="#9aa1ad" edge={false} />
          </g>
        ))}
        <Box x={-26} y={-26} z={150} w={52} d={52} h={6} color={K.deep} />
        <Box x={-14} y={-14} z={156} w={28} d={28} h={3} color={K.brand} />
        <Box x={-6} y={-6} z={159} w={12} d={12} h={1.5} color={K.soft} edge={false} />
        <Led p={[0, 0, 161]} color="#fff" r={1.2} pulse />
      </g>
      {/* satellite nodes */}
      <Box x={56} y={-96} w={26} d={26} h={22} color={K.slate} />
      <Led p={[69, -70, 11]} color={K.lime} />
      <Box x={-100} y={48} w={26} d={26} h={30} color={K.slate} />
      <Led p={[-87, 74, 15]} color={K.lime} pulse />
      <Beam a={[69, -83, 22]} b={[0, -42, 100]} packet dur={2.6} />
      <Beam a={[-87, 61, 30]} b={[-42, 0, 60]} packet dur={3.4} delay={1} />
    </Scene>
  );
}

export function StorageScene() {
  return (
    <Scene id="storage" scale={1.24} dy={10}>
      <Tile x={-90} y={-60} w={130} d={130} fill={K.glass} stroke={K.glassLine} />
      {/* object buckets: 3×3 small cubes */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <Box key={`${r}${c}`} x={40 + c * 22} y={-104 + r * 22} w={16} d={16} h={12 + ((r + c) % 3) * 6} color={(r + c) % 2 ? K.deep : K.brand} />
        )),
      )}
      {/* disk stack */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Cylinder id={`st-${i}`} x={-25} y={5} z={i * 22} r={50} h={15} color={i === 3 ? K.brand : K.chassis} />
          <Led p={[-25 + 46, 5, i * 22 + 8]} color={i === 1 ? K.cyan : K.lime} pulse={i % 2 === 0} />
        </g>
      ))}
      {/* platter highlight on top */}
      <ellipse cx={iso([-25, 5, 103])[0]} cy={iso([-25, 5, 103])[1]} rx={18} ry={10} fill="none" stroke={K.soft} strokeOpacity={0.6} strokeWidth={0.75} />
      <ellipse cx={iso([-25, 5, 103])[0]} cy={iso([-25, 5, 103])[1]} rx={4} ry={2.3} fill={K.soft} />
      {/* backup tape cartridges */}
      {[0, 1, 2].map((i) => (
        <Box key={i} x={-130 + i * 4} y={70 - i * 24} w={30} d={18} h={8} color={K.slate} />
      ))}
      <Beam a={[62, -50, 20]} b={[15, 0, 80]} packet dur={2.8} />
      <Beam a={[-110, 70, 8]} b={[-60, 20, 40]} packet dur={3.6} delay={0.8} />
    </Scene>
  );
}

export function NetworkingScene() {
  const nodes: P3[] = [
    [0, 0, 0],
    [96, -34, 0], [-96, 34, 0], [34, 96, 0], [-34, -96, 0],
    [120, 76, 0], [-120, -76, 0], [76, -130, 0], [-76, 130, 0],
    [160, -10, 0], [-160, 10, 0], [10, 160, 0], [-10, -160, 0],
  ];
  const links: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [3, 5], [2, 6], [4, 6], [1, 7], [4, 7], [2, 8], [3, 8],
    [1, 9], [5, 9], [2, 10], [6, 10], [3, 11], [8, 11], [4, 12], [7, 12], [5, 11], [6, 12], [7, 9], [8, 10],
  ];
  return (
    <Scene id="net" scale={1.15} dy={6}>
      <Tile x={-60} y={-60} w={120} d={120} fill={K.glass} stroke={K.glassLine} />
      {links.map(([a, b], i) => (
        <Beam key={i} a={[nodes[a][0], nodes[a][1], 16]} b={[nodes[b][0], nodes[b][1], 16]} opacity={0.32} packet={i % 3 === 0} dur={2 + (i % 5) * 0.4} delay={i * 0.2} />
      ))}
      {[...nodes]
        .map((n, i) => ({ n, i }))
        .sort((p, q) => p.n[0] + p.n[1] - (q.n[0] + q.n[1]))
        .map(({ n, i }) => {
          const hub = i === 0;
          const mid = i > 0 && i < 5;
          const r = hub ? 26 : mid ? 16 : 11;
          const h = hub ? 40 : mid ? 20 : 14;
          return (
            <g key={i}>
              <Cylinder id={`nn-${i}`} x={n[0]} y={n[1]} r={r} h={h} color={hub ? K.brand : mid ? K.deep : K.slate} />
              <Led p={[n[0], n[1], h + 1]} color={hub ? "#fff" : mid ? K.soft : K.lime} r={hub ? 2.6 : 1.6} pulse={i % 3 === 0} />
            </g>
          );
        })}
      {/* load balancer plate above the hub */}
      <g className="iso-float">
        <Tile x={-40} y={-40} z={84} w={80} d={80} fill={K.glass} stroke={K.glassLine} />
        <Box x={-12} y={-12} z={84} w={24} d={24} h={7} color={K.soft} />
        {[[-28, -28], [28, -28], [-28, 28], [28, 28]].map(([x, y]) => (
          <Led key={`${x}${y}`} p={[x, y, 85]} color={K.brand} r={1.4} />
        ))}
        {[[-28, -28], [28, -28], [-28, 28], [28, 28]].map(([x, y]) => (
          <Beam key={`b${x}${y}`} a={[x, y, 84]} b={[0, 0, 91]} color={K.soft} opacity={0.35} />
        ))}
      </g>
    </Scene>
  );
}

export function DataScene() {
  const bars = [30, 55, 42, 78, 64, 96];
  return (
    <Scene id="data" scale={1.2} dy={12}>
      <Tile x={-40} y={-120} w={150} d={90} fill={K.glass} stroke={K.glassLine} />
      {/* analytics bars */}
      {bars.map((h, i) => (
        <Box key={i} x={-30 + i * 22} y={-110 + i * 8} w={14} d={14} h={h} color={i === 3 ? K.brand : i === 5 ? K.soft : K.deep} />
      ))}
      {/* database cluster */}
      {[[-100, 20], [-40, 60], [20, 100]].map(([x, y], i) => (
        <g key={i}>
          {[0, 1, 2].map((s) => (
            <Cylinder key={s} id={`db-${i}-${s}`} x={x} y={y} z={s * 16} r={26} h={12} color={i === 1 ? K.brand : K.chassis} />
          ))}
          <Led p={[x + 22, y, 30]} color={K.lime} pulse={i === 1} />
        </g>
      ))}
      <Beam a={[-100, 20, 48]} b={[-40, 60, 48]} packet dur={2} />
      <Beam a={[-40, 60, 48]} b={[20, 100, 48]} packet dur={2} delay={1} />
      <Beam a={[-40, 60, 48]} b={[20, -80, 60]} packet dur={3} delay={0.5} opacity={0.3} />
    </Scene>
  );
}

export function AiScene() {
  const cores = [-2, -1, 0, 1, 2];
  return (
    <Scene id="ai" scale={1.05} dy={4}>
      {/* traces to pads */}
      {[[-130, -130], [130, -130], [-130, 130], [130, 130], [0, -150], [0, 150], [-150, 0], [150, 0]].map(([x, y], i) => (
        <g key={i}>
          <Box x={x - 10} y={y - 10} w={20} d={20} h={6} color={K.slate} />
          <Beam a={[x, y, 6]} b={[x * 0.42, y * 0.42, 12]} opacity={0.5} packet dur={1.8 + i * 0.2} delay={i * 0.25} />
        </g>
      ))}
      {/* package */}
      <Box x={-64} y={-64} w={128} d={128} h={10} color={K.chassis} />
      <Box x={-52} y={-52} z={10} w={104} d={104} h={4} color={K.deep} />
      {/* die with core grid */}
      <Box x={-40} y={-40} z={14} w={80} d={80} h={3} color={K.brand} />
      {cores.map((r) =>
        cores.map((c) => (
          <Box key={`${r}${c}`} x={c * 15 - 5} y={r * 15 - 5} z={17} w={10} d={10} h={(r + c) % 2 ? 4 : 2.5} color={(r + c) % 2 ? K.soft : K.brand} edge={false} />
        )),
      )}
      {/* heat spreader hovering above */}
      <g className="iso-float">
        <Tile x={-46} y={-46} z={62} w={92} d={92} fill={K.glass} stroke={K.glassLine} />
        {[-30, -15, 0, 15, 30].map((v) => (
          <Beam key={v} a={[v, -40, 62]} b={[v, 40, 62]} color={K.soft} opacity={0.3} />
        ))}
        <Led p={[0, 0, 63]} color="#fff" r={2.2} pulse />
      </g>
    </Scene>
  );
}

export function ContainersScene() {
  const cube = 26;
  const gap = 4;
  const cells: { x: number; y: number; z: number; c: string }[] = [];
  for (let l = 0; l < 3; l++) {
    const n = 3 - l;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        cells.push({
          x: (i - (n - 1) / 2) * (cube + gap),
          y: (j - (n - 1) / 2) * (cube + gap),
          z: l * (cube + gap),
          c: l === 2 ? K.soft : (i + j + l) % 2 ? K.brand : K.deep,
        });
  }
  cells.sort((a, b) => a.x + a.y - (b.x + b.y) || a.z - b.z);
  return (
    <Scene id="ctr" scale={1.24} dy={16}>
      <Tile x={-70} y={-70} w={140} d={140} fill={K.glass} stroke={K.glassLine} />
      {cells.map((c, i) => (
        <Box key={i} x={c.x - cube / 2} y={c.y - cube / 2} z={c.z} w={cube} d={cube} h={cube} color={c.c} />
      ))}
      {/* orbiting pods */}
      <g className="iso-float">
        <Box x={60} y={-96} z={40} w={22} d={22} h={22} color={K.slate} />
        <Led p={[71, -85, 63]} color={K.lime} pulse />
      </g>
      <g className="iso-float iso-float-2">
        <Box x={-104} y={56} z={30} w={22} d={22} h={22} color={K.slate} />
        <Led p={[-93, 67, 53]} color={K.cyan} />
      </g>
      <Beam a={[71, -85, 40]} b={[30, -30, 92]} packet dur={2.4} />
      <Beam a={[-93, 67, 30]} b={[-30, 30, 92]} packet dur={3} delay={1.2} />
    </Scene>
  );
}

export function ManagementScene() {
  const spark = [10, 18, 14, 26, 22, 34, 30, 44];
  return (
    <Scene id="mgmt" scale={1.3} dy={14}>
      {/* console base */}
      <Box x={-90} y={-30} w={180} d={110} h={8} color={K.chassis} />
      <Tile x={-84} y={-24} z={8} w={168} d={98} fill={K.glass} stroke={K.glassLine} />
      {/* bar chart */}
      {[24, 40, 32, 56, 48, 70].map((h, i) => (
        <Box key={i} x={-70 + i * 18} y={40} z={8} w={11} d={11} h={h} color={i === 5 ? K.soft : i % 2 ? K.brand : K.deep} />
      ))}
      {/* sparkline panel */}
      <g className="iso-float">
        <Tile x={-40} y={-100} z={80} w={120} d={60} fill="rgb(10 10 11 / 0.9)" stroke={K.glassLine} />
        {/* area under the line, standing on the panel */}
        <polygon
          points={[
            ...spark.map((v, i) => iso([-30 + i * 14, -70, 80 + v * 0.5]).join(",")),
            iso([-30 + (spark.length - 1) * 14, -70, 80]).join(","),
            iso([-30, -70, 80]).join(","),
          ].join(" ")}
          fill={K.lime}
          opacity={0.12}
        />
        <polyline
          points={spark.map((v, i) => iso([-30 + i * 14, -70, 80 + v * 0.5]).join(",")).join(" ")}
          stroke={K.lime}
          strokeWidth={1.5}
          fill="none"
        />
        {spark.map((v, i) => (
          <Led key={i} p={[-30 + i * 14, -70, 80 + v * 0.5]} color={K.lime} r={1} />
        ))}
      </g>
      {/* status tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i} className={i === 1 ? "iso-float iso-float-2" : undefined}>
          <Box x={30 + i * 26} y={-60} z={30 + i * 6} w={20} d={30} h={4} color={K.slate} />
          <Led p={[40 + i * 26, -50, 35 + i * 6]} color={i === 2 ? K.cyan : K.lime} pulse={i === 0} />
        </g>
      ))}
      <Beam a={[0, -70, 80]} b={[0, 20, 16]} opacity={0.3} packet dur={2.5} />
    </Scene>
  );
}

export function SecurityScene() {
  const ring = (s: number, z: number, color: string) => (
    <g>
      <Box x={-s} y={-s} z={z} w={2 * s} d={6} h={10} color={color} />
      <Box x={-s} y={-s} z={z} w={6} d={2 * s} h={10} color={color} />
      <Box x={s - 6} y={-s} z={z} w={6} d={2 * s} h={10} color={color} />
      <Box x={-s} y={s - 6} z={z} w={2 * s} d={6} h={10} color={color} />
    </g>
  );
  return (
    <Scene id="sec" scale={1.12} dy={12}>
      <Tile x={-120} y={-120} w={240} d={240} fill={K.glass} stroke={K.glassLine} />
      {ring(110, 0, K.chassis)}
      {ring(78, 0, K.slate)}
      {[[-110, -110], [110, -110], [-110, 110], [110, 110]].map(([x, y]) => (
        <Led key={`${x}${y}`} p={[x, y, 12]} color={K.brand} pulse />
      ))}
      {/* core vault */}
      <Box x={-30} y={-30} w={60} d={60} h={44} color={K.deep} />
      <Box x={-20} y={-20} z={44} w={40} d={40} h={6} color={K.brand} />
      {/* key / lock indicator */}
      <g className="iso-float">
        <Cylinder id="lock-ring" x={0} y={0} z={78} r={16} h={4} color={K.soft} />
        <Box x={-9} y={-9} z={60} w={18} d={18} h={18} color={K.soft} />
        <Led p={[0, 0, 83]} color="#fff" r={2} pulse />
      </g>
      {/* denied packet bouncing off the perimeter */}
      <Beam a={[-190, 40, 10]} b={[-116, 0, 10]} color={K.magenta} opacity={0.5} packet dur={1.8} />
      <Beam a={[190, -40, 10]} b={[116, 0, 10]} color={K.lime} opacity={0.5} packet dur={2.2} delay={0.6} />
    </Scene>
  );
}

/** Three peer zones with redundant links — the platform as a whole. */
export function PlatformScene() {
  const zones: [number, number][] = [[0, -120], [-110, 70], [110, 70]];
  return (
    <Scene id="plat" scale={1.18} dy={10}>
      {zones.map(([x, y], i) => (
        <Beam key={i} a={[x, y, 20]} b={[zones[(i + 1) % 3][0], zones[(i + 1) % 3][1], 20]} opacity={0.4} packet dur={2.6} delay={i * 0.9} />
      ))}
      {[...zones]
        .map((z, i) => ({ z, i }))
        .sort((p, q) => p.z[0] + p.z[1] - (q.z[0] + q.z[1]))
        .map(({ z: [x, y], i }) => (
          <g key={i}>
            <Tile x={x - 44} y={y - 44} w={88} d={88} fill={K.glass} stroke={K.glassLine} />
            {[0, 1, 2].map((u) => (
              <Box key={u} x={x - 22} y={y - 22} z={u * 14} w={44} d={44} h={12} color={u % 2 ? K.slate : K.chassis} />
            ))}
            <Box x={x - 12} y={y - 12} z={42} w={24} d={24} h={6} color={K.brand} />
            <Led p={[x, y, 49]} color={K.lime} pulse={i === 0} />
          </g>
        ))}
      <g className="iso-float">
        <Cylinder id="plat-lb" x={0} y={10} z={110} r={22} h={8} color={K.soft} />
        <Led p={[0, 10, 119]} color="#fff" r={2} pulse />
      </g>
      {zones.map(([x, y], i) => (
        <Beam key={`u${i}`} a={[0, 10, 110]} b={[x, y, 48]} opacity={0.25} packet dur={2 + i * 0.4} delay={i * 0.5} />
      ))}
    </Scene>
  );
}
