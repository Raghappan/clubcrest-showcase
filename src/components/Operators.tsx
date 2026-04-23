import { motion } from "framer-motion";
import { OPERATORS, RANKS } from "@/data/syndicate";
import { useMemo, useState } from "react";

const RANK_COLORS: Record<string, string> = {
  architect: "bg-acid text-ink",
  council:   "bg-ink text-paper",
  captain:   "bg-paper-deep text-ink border border-ink",
  operator:  "bg-paper text-ink border border-ink",
  initiate:  "bg-paper text-muted-foreground border border-ink/40",
  applicant: "bg-paper text-muted-foreground border border-dashed border-ink/40",
};

export default function Operators() {
  const [filter, setFilter] = useState<string>("ALL");

  const sorted = useMemo(
    () => [...OPERATORS].sort((a, b) => b.points - a.points),
    []
  );

  const cells = ["ALL", ...Array.from(new Set(OPERATORS.map((o) => o.cell)))];

  const visible = filter === "ALL" ? sorted : sorted.filter((o) => o.cell === filter);

  const rankTitle = (id: string) => RANKS.find((r) => r.id === id)?.title ?? id;

  return (
    <section id="operators" className="border-t border-ink">
      <div className="container py-20 md:py-28">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mb-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              03 ——— operator ledger
            </div>
            <h2 className="display font-black uppercase tracking-[-0.02em] text-6xl md:text-7xl leading-[0.85]">
              The leaderboard.<br/>
              <span className="italic font-light">Public. Live.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6 lg:border-l lg:border-ink space-y-6">
            <p className="text-[15px] leading-relaxed max-w-2xl">
              Every operator carries a public point balance. Points come from shipped
              operations, mentored initiates, and ratified doctrine commits. The captain
              of each cell signs every entry; the Council audits the ledger weekly.
            </p>
            <div className="flex flex-wrap gap-2">
              {cells.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1.5 mono text-[10.5px] tracking-[0.2em] uppercase border border-ink transition-colors ${
                    filter === c ? "bg-ink text-paper" : "bg-paper hover:bg-acid hover:text-ink"
                  }`}
                >
                  {c === "ALL" ? "▸ all cells" : `· ${c}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border border-ink bg-paper">
          {/* head */}
          <div className="hidden md:grid grid-cols-12 mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground border-b border-ink bg-paper-deep">
            <div className="col-span-1 p-3 border-r border-ink">#</div>
            <div className="col-span-3 p-3 border-r border-ink">operator</div>
            <div className="col-span-2 p-3 border-r border-ink">rank</div>
            <div className="col-span-2 p-3 border-r border-ink">cell · region</div>
            <div className="col-span-2 p-3 border-r border-ink">specialty</div>
            <div className="col-span-1 p-3 border-r border-ink text-right">Δ wk</div>
            <div className="col-span-1 p-3 text-right">points</div>
          </div>

          {/* rows */}
          {visible.map((o, i) => {
            const rank = RANKS.find((r) => r.id === o.rank)!;
            return (
              <motion.div
                key={o.handle}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.5) }}
                className={`grid grid-cols-12 items-center text-[13px] border-b border-ink last:border-b-0 hover:bg-acid/20 transition-colors ${i === 0 ? "bg-acid/30" : ""}`}
              >
                <div className="col-span-2 md:col-span-1 p-3 border-r border-ink mono text-[12px] flex items-center gap-2">
                  <span className="opacity-50">{String(i + 1).padStart(2, "0")}</span>
                  {i === 0 && <span className="text-acid">◆</span>}
                </div>
                <div className="col-span-10 md:col-span-3 p-3 border-r border-ink">
                  <div className="display font-bold text-base leading-none">{o.name}</div>
                  <div className="mono text-[11px] text-muted-foreground mt-1">{o.handle}</div>
                </div>
                <div className="col-span-6 md:col-span-2 p-3 border-r border-ink">
                  <span className={`inline-block px-2 py-1 mono text-[10px] tracking-[0.18em] uppercase ${RANK_COLORS[o.rank]}`}>
                    {rank.code} · {rankTitle(o.rank)}
                  </span>
                </div>
                <div className="col-span-6 md:col-span-2 p-3 border-r border-ink mono text-[11.5px] tracking-wider uppercase">
                  {o.cell} <span className="text-muted-foreground">/ {o.region}</span>
                </div>
                <div className="hidden md:block col-span-2 p-3 border-r border-ink text-[12.5px]">
                  {o.specialty}
                </div>
                <div className="col-span-6 md:col-span-1 p-3 border-r border-ink text-right mono">
                  {o.delta > 0 ? (
                    <span className="text-acid-foreground bg-acid px-1.5 py-0.5 text-[11px]">+{o.delta}</span>
                  ) : (
                    <span className="text-muted-foreground text-[11px]">—</span>
                  )}
                </div>
                <div className="col-span-6 md:col-span-1 p-3 text-right">
                  <div className="display font-black text-lg tracking-tight leading-none">
                    {o.points.toLocaleString()}
                  </div>
                  <div className="mono text-[9.5px] tracking-widest text-muted-foreground mt-1">
                    {o.streak}w streak
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-acid rounded-full dot-pulse" />
          ledger synced · {new Date().toLocaleTimeString("en-GB")} · public extract — {visible.length} of {OPERATORS.length}
        </div>
      </div>
    </section>
  );
}
