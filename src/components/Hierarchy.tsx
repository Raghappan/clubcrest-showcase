import { motion } from "framer-motion";
import { RANKS, TOTAL_MEMBERS } from "@/data/syndicate";

export default function Hierarchy() {
  const max = Math.max(...RANKS.map((r) => r.count));

  return (
    <section id="hierarchy" className="border-t border-ink bg-paper-deep">
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mb-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              02 ——— the hierarchy
            </div>
            <h2 className="display font-black uppercase tracking-[-0.02em] text-6xl md:text-7xl leading-[0.85]">
              Six ranks.<br/>
              <span className="italic font-light">One ladder.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6 lg:border-l lg:border-ink">
            <p className="text-[15px] leading-relaxed max-w-2xl">
              Every operator carries a rank from <span className="mono bg-ink text-paper px-1.5 py-0.5 text-[12px]">R5</span> to{" "}
              <span className="mono bg-acid text-ink px-1.5 py-0.5 text-[12px]">R0</span>. Promotion is mechanical:
              shipped work, mentored juniors, doctrine contributions. The point ledger is public.
              The captain signs off. The Council ratifies. Nobody negotiates rank.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 mono text-[11px] tracking-[0.18em] uppercase">
              <span><span className="text-acid">▸</span> {TOTAL_MEMBERS} sworn</span>
              <span><span className="text-acid">▸</span> 08 cells</span>
              <span><span className="text-acid">▸</span> 07 ops live</span>
              <span><span className="text-acid">▸</span> Q-cycle 04 / 26</span>
            </div>
          </div>
        </div>

        {/* Rank bars */}
        <div className="border border-ink bg-paper">
          {RANKS.map((r, i) => {
            const isTop = i === 0;
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.2,0.7,0.2,1] }}
                className={`grid grid-cols-12 items-stretch ${i !== 0 ? "border-t border-ink" : ""} group`}
              >
                {/* Code */}
                <div className={`col-span-2 md:col-span-1 flex items-center justify-center border-r border-ink mono text-sm tracking-widest ${isTop ? "bg-ink text-paper" : ""}`}>
                  {r.code}
                </div>

                {/* Title block */}
                <div className="col-span-10 md:col-span-3 p-5 md:p-6 border-r border-ink">
                  <div className="display font-black text-2xl md:text-3xl uppercase tracking-tight leading-none">
                    {r.title}
                  </div>
                  <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground mt-2">
                    {r.subtitle}
                  </div>
                </div>

                {/* Bar / count visual */}
                <div className="col-span-12 md:col-span-6 p-5 md:p-6 border-t md:border-t-0 md:border-r border-ink relative">
                  <div className="flex items-baseline justify-between mb-2 mono text-[10.5px] tracking-[0.22em] uppercase">
                    <span className="text-muted-foreground">density</span>
                    <span className="text-ink">{r.count.toString().padStart(2,"0")} / {TOTAL_MEMBERS}</span>
                  </div>
                  <div className="h-3 w-full bg-ink/8 relative overflow-hidden">
                    <motion.div
                      className={`h-full ${isTop ? "bg-acid" : "bg-ink"} group-hover:bg-acid transition-colors`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(r.count / max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.07, ease: [0.7,0,0.2,1] }}
                    />
                  </div>
                  <div className="mt-3 text-[13px] leading-snug italic text-ink-soft">
                    “{r.doctrine}”
                  </div>
                </div>

                {/* Threshold */}
                <div className="col-span-12 md:col-span-2 p-5 md:p-6 flex flex-col justify-between border-t md:border-t-0 bg-paper-deep">
                  <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground">
                    threshold
                  </div>
                  <div className="display font-black text-3xl md:text-4xl tracking-tighter">
                    {r.threshold.toLocaleString()}
                    <span className="mono text-[10px] tracking-widest text-muted-foreground ml-1">pts</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Promotion path diagram */}
        <div className="mt-10 border border-ink bg-paper p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                promotion path
              </div>
              <h3 className="display font-black text-3xl md:text-4xl uppercase tracking-tight">
                R5 → R0 · the only way up.
              </h3>
            </div>
            <div className="mono text-[11px] tracking-widest uppercase text-muted-foreground">
              avg cycle: 14 weeks · approval: captain + council
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {RANKS.slice().reverse().map((r, i, arr) => (
              <div key={r.id} className="relative">
                <div className={`border border-ink p-3 md:p-4 text-center ${i === arr.length - 1 ? "bg-acid" : i === 0 ? "bg-ink text-paper" : "bg-paper-deep"}`}>
                  <div className="mono text-[10px] tracking-widest opacity-70">{r.code}</div>
                  <div className="display font-black text-[13px] md:text-base mt-1 leading-tight">{r.title}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 w-4 h-4 items-center justify-center bg-paper">
                    <span className="text-ink text-xs">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
