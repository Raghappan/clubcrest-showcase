import { motion } from "framer-motion";
import { OPERATORS, ALL_RANKS, RECRUITMENT } from "@/data/syndicate";
import { useMemo, useState } from "react";

const RANK_COLORS: Record<string, string> = {
  cto:           "bg-acid text-ink",
  vp:            "bg-ink text-paper",
  director:      "bg-ink text-paper",
  em:            "bg-paper-deep text-ink border border-ink",
  distinguished: "bg-acid text-ink",
  principal:     "bg-ink text-paper",
  staff:         "bg-paper-deep text-ink border border-ink",
  senior:        "bg-paper-deep text-ink border border-ink",
  mid:           "bg-paper text-ink border border-ink",
  junior:        "bg-paper text-muted-foreground border border-ink/40",
  intern:        "bg-paper text-muted-foreground border border-dashed border-ink/40",
};

export default function Operators() {
  const [filter, setFilter] = useState<string>("ALL");

  const sorted = useMemo(() => {
    const order = (id: string) => ALL_RANKS.findIndex((r) => r.id === id);
    return [...OPERATORS].sort((a, b) => order(b.rank) - order(a.rank));
  }, []);

  const cells = ["ALL", ...Array.from(new Set(OPERATORS.map((o) => o.cell)))];
  const visible = filter === "ALL" ? sorted : sorted.filter((o) => o.cell === filter);
  const rankByid = (id: string) => ALL_RANKS.find((r) => r.id === id)!;

  const open = RECRUITMENT.target - RECRUITMENT.filled;

  return (
    <section id="operators" className="border-t border-ink">
      <div className="container py-20 md:py-28">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mb-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              03 ——— the roster
            </div>
            <h2 className="display font-black uppercase tracking-[-0.02em] text-6xl md:text-7xl leading-[0.85]">
              {RECRUITMENT.filled} sworn.<br/>
              <span className="italic font-light">{open} open.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6 lg:border-l lg:border-ink space-y-6">
            <p className="text-[15px] leading-relaxed max-w-2xl">
              The first wave of <span className="font-bold">{RECRUITMENT.filled} tech syndicates</span> have been recruited
              into the guild. Below is the public roster — handle, rank, cell, region, specialty.
              The remaining <span className="mono bg-acid text-ink px-1.5 py-0.5 text-[12px]">{open} seats</span> open across
              both tracks. The Council reviews applicants weekly.
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
            <div className="col-span-3 p-3 border-r border-ink">rank</div>
            <div className="col-span-2 p-3 border-r border-ink">cell · region</div>
            <div className="col-span-2 p-3 border-r border-ink">specialty</div>
            <div className="col-span-1 p-3 text-right">joined</div>
          </div>

          {/* rows */}
          {visible.map((o, i) => {
            const rank = rankByid(o.rank);
            return (
              <motion.div
                key={o.handle}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.5) }}
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
                <div className="col-span-12 md:col-span-3 p-3 border-r border-ink">
                  <span className={`inline-block px-2 py-1 mono text-[10px] tracking-[0.18em] uppercase ${RANK_COLORS[o.rank]}`}>
                    {rank.code} · {rank.title}
                  </span>
                </div>
                <div className="col-span-6 md:col-span-2 p-3 border-r border-ink mono text-[11.5px] tracking-wider uppercase">
                  {o.cell} <span className="text-muted-foreground">/ {o.region}</span>
                </div>
                <div className="col-span-6 md:col-span-2 p-3 border-r border-ink text-[12.5px]">
                  {o.specialty}
                </div>
                <div className="col-span-12 md:col-span-1 p-3 text-right mono text-[11px] tracking-widest">
                  {o.joined}
                </div>
              </motion.div>
            );
          })}

          {/* Open seats hint row */}
          <div className="grid grid-cols-12 items-center bg-ink text-paper">
            <div className="col-span-12 md:col-span-1 p-3 border-r border-paper/15 mono text-[12px] flex items-center gap-2">
              <span className="text-acid dot-pulse">◆</span>
              <span className="opacity-50">06+</span>
            </div>
            <div className="col-span-12 md:col-span-11 p-3 mono text-[11px] tracking-[0.22em] uppercase flex flex-wrap items-center justify-between gap-3">
              <span>{open} seats open across the ladder</span>
              <a href="#initiation" className="text-acid reveal-link">request a seat →</a>
            </div>
          </div>
        </div>

        <div className="mt-4 mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-acid rounded-full dot-pulse" />
          roster synced · {new Date().toLocaleTimeString("en-GB")} · public extract — {visible.length} of {OPERATORS.length}
        </div>
      </div>
    </section>
  );
}
