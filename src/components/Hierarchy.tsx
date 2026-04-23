import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { IC_RANKS, MGMT_RANKS, ALL_RANKS, RECRUITMENT, type Rank } from "@/data/syndicate";

/**
 * Interactive Node Map — Codex Syndicate Hierarchy
 *
 * Layout (logical 0..100 grid, rendered into a responsive aspect-box):
 *   IC track flows left → right across the middle.
 *   At L4 (senior) the path branches upward into the MGMT fork.
 *   Each rank is a clickable node. Click highlights the full path from L0 to that node.
 */

type NodePos = { x: number; y: number };

const NODE_POS: Record<string, NodePos> = {
  // IC track — bottom row, left to right
  intern:        { x: 6,  y: 72 },
  junior:        { x: 19, y: 72 },
  mid:           { x: 32, y: 72 },
  senior:        { x: 46, y: 72 }, // the fork point
  staff:         { x: 60, y: 72 },
  principal:     { x: 76, y: 72 },
  distinguished: { x: 92, y: 72 },
  // MGMT fork — upper diagonal off senior
  em:       { x: 56, y: 38 },
  director: { x: 68, y: 28 },
  vp:       { x: 80, y: 20 },
  cto:      { x: 92, y: 14 },
};

// edges as ordered pairs of rank ids
const EDGES: [string, string][] = [
  // IC trunk
  ["intern", "junior"],
  ["junior", "mid"],
  ["mid", "senior"],
  ["senior", "staff"],
  ["staff", "principal"],
  ["principal", "distinguished"],
  // MGMT fork from senior
  ["senior", "em"],
  ["em", "director"],
  ["director", "vp"],
  ["vp", "cto"],
];

// Path from L0 → target, used for highlighting
function pathTo(target: string): string[] {
  const ic = ["intern", "junior", "mid", "senior", "staff", "principal", "distinguished"];
  const mg = ["intern", "junior", "mid", "senior", "em", "director", "vp", "cto"];
  if (ic.includes(target)) return ic.slice(0, ic.indexOf(target) + 1);
  return mg.slice(0, mg.indexOf(target) + 1);
}

export default function Hierarchy() {
  const [activeId, setActiveId] = useState<string>("senior");
  const [hoverId, setHoverId] = useState<string | null>(null);

  const focusId = hoverId ?? activeId;
  const active = useMemo(() => ALL_RANKS.find((r) => r.id === focusId)!, [focusId]);
  const litPath = useMemo(() => new Set(pathTo(focusId)), [focusId]);

  const isLit = (id: string) => litPath.has(id);
  const isEdgeLit = (a: string, b: string) => isLit(a) && isLit(b);

  return (
    <section id="hierarchy" className="border-t border-ink bg-paper-deep relative overflow-hidden">
      {/* Section header */}
      <div className="container pt-20 md:pt-28 pb-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              02 ——— constellation
            </div>
            <h2 className="display font-black uppercase tracking-[-0.02em] text-6xl md:text-7xl leading-[0.85]">
              Eleven nodes.<br/>
              <span className="italic font-light">One ladder.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6 lg:border-l lg:border-ink">
            <p className="text-[15px] leading-relaxed max-w-2xl">
              Every operator occupies one node. The trunk runs L0 → Distinguished;
              at <span className="mono bg-acid text-acid-foreground px-1.5 py-0.5 text-[12px]">L4</span> the
              fork branches upward into the management chain. Tap any node to trace the path
              from the entry point to the chair.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 mono text-[11px] tracking-[0.18em] uppercase">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-acid" /> filled node
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 border border-ink bg-paper" /> open seat
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-ink" /> the chair
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="w-3 h-px bg-acid" /> live trace
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* THE NODE MAP */}
      <div className="container pb-10">
        <div className="border border-ink bg-paper relative">
          {/* Constellation canvas */}
          <div className="relative w-full" style={{ aspectRatio: "16 / 9", minHeight: 420 }}>
            {/* faint dot grid background */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(hsl(var(--ink) / 0.18) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />

            {/* SVG edges */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {EDGES.map(([a, b], i) => {
                const pa = NODE_POS[a];
                const pb = NODE_POS[b];
                const lit = isEdgeLit(a, b);
                return (
                  <g key={`${a}-${b}`}>
                    <line
                      x1={pa.x} y1={pa.y}
                      x2={pb.x} y2={pb.y}
                      stroke={lit ? "hsl(var(--acid))" : "hsl(var(--ink) / 0.22)"}
                      strokeWidth={lit ? 0.45 : 0.18}
                      strokeDasharray={lit ? "0" : "0.6 0.6"}
                      vectorEffect="non-scaling-stroke"
                      style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                    />
                    {lit && (
                      <motion.line
                        key={`pulse-${a}-${b}-${focusId}`}
                        x1={pa.x} y1={pa.y}
                        x2={pb.x} y2={pb.y}
                        stroke="hsl(var(--acid))"
                        strokeWidth={1.2}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ opacity: 0.9, strokeWidth: 1.4 }}
                        animate={{ opacity: 0, strokeWidth: 3 }}
                        transition={{ duration: 0.9, delay: i * 0.05 }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Fork annotation — soft arc near senior */}
              <text
                x={NODE_POS.senior.x + 1}
                y={NODE_POS.senior.y - 14}
                fontSize="1.6"
                fill="hsl(var(--muted-foreground))"
                fontFamily="Fira Code, monospace"
                style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                ↑ fork
              </text>
            </svg>

            {/* Track labels */}
            <div className="absolute left-3 top-3 mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              ◆ MGMT fork
            </div>
            <div className="absolute left-3 bottom-3 mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              ▸ IC track · L0 → DE
            </div>

            {/* Nodes */}
            {ALL_RANKS.map((r) => {
              const pos = NODE_POS[r.id];
              const lit = isLit(r.id);
              const focused = r.id === focusId;
              const filled = r.count > 0;
              const isChair = r.id === "cto";

              return (
                <button
                  key={r.id}
                  onMouseEnter={() => setHoverId(r.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(r.id)}
                  onBlur={() => setHoverId(null)}
                  onClick={() => setActiveId(r.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  aria-label={`${r.code} ${r.title}`}
                >
                  {/* halo ring on focus/lit */}
                  <span
                    className={`absolute inset-0 -m-3 border transition-all duration-300 ${
                      focused
                        ? "border-acid scale-110"
                        : lit
                        ? "border-acid/50"
                        : "border-transparent"
                    }`}
                  />
                  {/* node square */}
                  <span
                    className={`relative block w-5 h-5 md:w-6 md:h-6 border border-ink transition-all duration-300 ${
                      isChair
                        ? "bg-ink"
                        : filled
                        ? "bg-acid"
                        : "bg-paper"
                    } ${
                      focused ? "scale-125 shadow-[0_0_0_4px_hsl(var(--acid)/0.25)]" : "group-hover:scale-110"
                    }`}
                  >
                    {/* inner pulse for filled nodes */}
                    {filled && !isChair && (
                      <span className="absolute inset-1 bg-paper-deep" />
                    )}
                    {isChair && (
                      <span className="absolute inset-1 bg-acid" />
                    )}
                  </span>
                  {/* label */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 mt-2 mono text-[9.5px] md:text-[10px] tracking-[0.18em] uppercase whitespace-nowrap transition-colors ${
                      focused ? "text-acid" : lit ? "text-ink" : "text-muted-foreground"
                    }`}
                    style={{ top: "100%" }}
                  >
                    {r.code}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail readout */}
          <div className="border-t border-ink grid grid-cols-12">
            {/* Left — title block */}
            <div className="col-span-12 md:col-span-7 p-6 md:p-8 border-b md:border-b-0 md:border-r border-ink">
              <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground mb-2 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-acid rounded-full dot-pulse" />
                trace · {active.code} · {active.track === "IC" ? "individual contributor" : "management fork"}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="display font-black uppercase tracking-[-0.02em] text-4xl md:text-5xl leading-[0.9]">
                    {active.title}
                  </h3>
                  <div className="mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mt-3">
                    rung {active.index} of 11 · {active.subtitle}
                  </div>
                  <p className="mt-5 italic text-[15px] leading-relaxed text-ink-soft max-w-xl">
                    "{active.doctrine}"
                  </p>

                  {/* path breadcrumb */}
                  <div className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2 mono text-[10.5px] tracking-[0.2em] uppercase">
                    {Array.from(litPath).map((id, i, arr) => {
                      const r = ALL_RANKS.find((x) => x.id === id)!;
                      const last = i === arr.length - 1;
                      return (
                        <span key={id} className="flex items-center gap-1.5">
                          <span className={last ? "text-acid" : "text-muted-foreground"}>
                            {r.code}
                          </span>
                          {!last && <span className="text-muted-foreground">→</span>}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — capacity + status */}
            <div className="col-span-12 md:col-span-5 p-6 md:p-8 bg-paper-deep">
              <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground">
                seat capacity
              </div>
              <div className="display font-black text-5xl md:text-6xl tracking-tighter mt-2 leading-none flex items-baseline gap-2">
                <span className={active.count > 0 ? "text-acid" : ""}>
                  {String(active.count).padStart(2, "0")}
                </span>
                <span className="text-2xl md:text-3xl text-muted-foreground">
                  / {String(active.capacity).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-4 h-2 w-full bg-ink/10 relative overflow-hidden">
                <motion.div
                  key={`bar-${active.id}`}
                  className="h-full bg-acid"
                  initial={{ width: 0 }}
                  animate={{ width: `${(active.count / active.capacity) * 100}%` }}
                  transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
                />
              </div>

              <div className="mt-3 mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground flex justify-between">
                <span>
                  {active.capacity - active.count > 0
                    ? `${active.capacity - active.count} open`
                    : "full · waitlist"}
                </span>
                <span className={active.count > 0 ? "text-acid" : ""}>
                  {active.count > 0 ? "ACTIVE" : "OPEN"}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-ink/30 grid grid-cols-2 gap-4 mono text-[10.5px] tracking-[0.22em] uppercase">
                <div>
                  <div className="text-muted-foreground">track</div>
                  <div className="text-ink mt-1">
                    {active.track === "IC" ? "individual contributor" : "management"}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">level</div>
                  <div className="text-ink mt-1">{active.level}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact rank index — quick jump */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground mr-2">
            jump →
          </span>
          {[
            { label: "IC", ranks: IC_RANKS },
            { label: "MGMT", ranks: MGMT_RANKS },
          ].map((group) => (
            <div key={group.label} className="flex items-center gap-1.5">
              <span className="mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                {group.label}
              </span>
              {group.ranks.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveId(r.id)}
                  onMouseEnter={() => setHoverId(r.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={`mono text-[10.5px] tracking-[0.18em] uppercase border border-ink px-2 py-1 transition-colors ${
                    activeId === r.id
                      ? "bg-acid text-acid-foreground"
                      : "bg-paper hover:bg-ink hover:text-paper"
                  }`}
                >
                  {r.code}
                </button>
              ))}
              {group.label === "IC" && (
                <span className="mono text-muted-foreground mx-1">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// (Rank type imported solely to satisfy any future extension; safe to leave.)
export type _RankRef = Rank;
