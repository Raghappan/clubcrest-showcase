import { motion } from "framer-motion";
import { IC_RANKS, MGMT_RANKS, ALL_RANKS, RECRUITMENT, type Rank } from "@/data/syndicate";

export default function Hierarchy() {
  return (
    <section id="hierarchy" className="border-t border-ink bg-paper-deep">
      <div className="container py-20 md:py-28">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mb-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              02 ——— the ladder
            </div>
            <h2 className="display font-black uppercase tracking-[-0.02em] text-6xl md:text-7xl leading-[0.85]">
              Eleven rungs.<br/>
              <span className="italic font-light">Two tracks.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6 lg:border-l lg:border-ink">
            <p className="text-[15px] leading-relaxed max-w-2xl">
              The Core IC ladder runs from{" "}
              <span className="mono bg-ink text-paper px-1.5 py-0.5 text-[12px]">L0 Intern</span> to{" "}
              <span className="mono bg-acid text-ink px-1.5 py-0.5 text-[12px]">Distinguished Engineer</span>.
              Around Senior, every operator faces the fork — stay technical, or move into management.
              Both tracks are equal in standing; neither is a demotion.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 mono text-[11px] tracking-[0.18em] uppercase">
              <span><span className="text-acid">▸</span> {RECRUITMENT.filled}/50 sworn</span>
              <span><span className="text-acid">▸</span> 07 IC rungs</span>
              <span><span className="text-acid">▸</span> 04 MGMT rungs</span>
              <span><span className="text-acid">▸</span> fork @ L4</span>
            </div>
          </div>
        </div>

        {/* IC LADDER */}
        <TrackHeader number="A" title="IC TRACK" subtitle="Individual Contributor — depth over scope" rungs={IC_RANKS.length} />
        <RankTable ranks={IC_RANKS} />

        {/* The fork — visual */}
        <div className="my-16 relative">
          <div className="border border-ink bg-paper p-6 md:p-10 relative overflow-hidden">
            <div className="grid grid-cols-12 gap-6 items-center relative z-10">
              <div className="col-span-12 md:col-span-4">
                <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  the management fork
                </div>
                <h3 className="display font-black uppercase tracking-tight text-4xl md:text-5xl leading-[0.9]">
                  At <span className="bg-acid text-ink px-2">L4</span>,<br/>the road splits.
                </h3>
              </div>
              <div className="col-span-12 md:col-span-8">
                <div className="grid grid-cols-3 gap-2 items-stretch">
                  <div className="bg-ink text-paper p-4 md:p-5">
                    <div className="mono text-[10px] tracking-[0.22em] opacity-60">L4 · senior</div>
                    <div className="display font-black text-2xl md:text-3xl mt-1 leading-none">YOU ARE HERE</div>
                    <div className="mono text-[10px] tracking-widest opacity-60 mt-3">choose a path →</div>
                  </div>
                  <div className="bg-paper-deep border border-ink p-4 md:p-5">
                    <div className="mono text-[10px] tracking-[0.22em] text-muted-foreground">↑ continue IC</div>
                    <div className="display font-black text-2xl md:text-3xl mt-1 leading-none">L6 · STAFF</div>
                    <div className="text-[12px] mt-3 leading-snug">Cross-team scope. Code & systems first.</div>
                  </div>
                  <div className="bg-acid text-ink p-4 md:p-5">
                    <div className="mono text-[10px] tracking-[0.22em] opacity-70">→ fork to MGMT</div>
                    <div className="display font-black text-2xl md:text-3xl mt-1 leading-none">EM</div>
                    <div className="text-[12px] mt-3 leading-snug">People, delivery, process. Not less — different.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MGMT FORK */}
        <TrackHeader number="B" title="MANAGEMENT FORK" subtitle="People & org — scope over depth" rungs={MGMT_RANKS.length} dark />
        <RankTable ranks={MGMT_RANKS} dark />

        {/* Full path strip */}
        <div className="mt-16 border border-ink bg-paper p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                the full path
              </div>
              <h3 className="display font-black text-3xl md:text-4xl uppercase tracking-tight">
                L0 → CTO · all eleven rungs.
              </h3>
            </div>
            <div className="mono text-[11px] tracking-widest uppercase text-muted-foreground">
              avg cycle: 14 weeks · approval: captain + council
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
            {ALL_RANKS.map((r, i) => {
              const isLast = i === ALL_RANKS.length - 1;
              const filled = r.count > 0;
              return (
                <div key={r.id} className="relative">
                  <div className={`border border-ink p-2 md:p-3 text-center min-h-[78px] flex flex-col justify-center ${
                    isLast ? "bg-ink text-paper" : filled ? "bg-acid" : "bg-paper-deep"
                  }`}>
                    <div className="mono text-[9px] tracking-widest opacity-70">{r.code}</div>
                    <div className="display font-black text-[11px] md:text-[12px] mt-1 leading-tight uppercase">{r.title.split(" ")[0]}</div>
                    {filled && !isLast && (
                      <div className="mono text-[9px] mt-1 opacity-70">{r.count}/{r.capacity}</div>
                    )}
                  </div>
                  {i === 6 && (
                    <div className="hidden lg:block absolute -top-3 left-1/2 -translate-x-1/2 mono text-[9px] tracking-widest text-muted-foreground whitespace-nowrap">
                      ─── fork @ L4 ───
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-acid border border-ink"/> filled</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-paper-deep border border-ink"/> open</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-ink"/> the chair</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackHeader({ number, title, subtitle, rungs, dark }: { number: string; title: string; subtitle: string; rungs: number; dark?: boolean }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4 mb-0 ${dark ? "" : ""}`}>
      <div className="flex items-baseline gap-4">
        <div className={`display font-black text-5xl md:text-6xl tracking-tighter leading-none ${dark ? "text-ink" : ""}`}>
          {number}.
        </div>
        <div>
          <div className="display font-black text-2xl md:text-3xl uppercase tracking-tight leading-none">{title}</div>
          <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground mt-2">{subtitle}</div>
        </div>
      </div>
      <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground">
        {String(rungs).padStart(2,"0")} rungs
      </div>
    </div>
  );
}

function RankTable({ ranks, dark }: { ranks: Rank[]; dark?: boolean }) {
  const max = Math.max(...ranks.map((r) => r.capacity));
  return (
    <div className={`border border-t-0 border-ink ${dark ? "bg-ink text-paper" : "bg-paper"}`}>
      {ranks.map((r, i) => {
        const filledRatio = r.capacity ? r.count / r.capacity : 0;
        return (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            className={`grid grid-cols-12 items-stretch ${i !== 0 ? `border-t ${dark ? "border-paper/15" : "border-ink"}` : ""} group`}
          >
            {/* Code */}
            <div className={`col-span-2 md:col-span-1 flex items-center justify-center mono text-sm tracking-widest border-r ${dark ? "border-paper/15" : "border-ink"}`}>
              {r.code}
            </div>

            {/* Title */}
            <div className={`col-span-10 md:col-span-4 p-5 md:p-6 border-r ${dark ? "border-paper/15" : "border-ink"}`}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <div className="display font-black text-2xl md:text-[28px] uppercase tracking-tight leading-none">
                  {r.title}
                </div>
                <div className={`mono text-[10px] tracking-[0.22em] uppercase ${dark ? "text-paper/50" : "text-muted-foreground"}`}>
                  · {r.level}
                </div>
              </div>
              <div className={`mono text-[10.5px] tracking-[0.22em] uppercase mt-2 ${dark ? "text-paper/60" : "text-muted-foreground"}`}>
                {r.subtitle}
              </div>
              <div className={`mt-3 text-[13px] italic leading-snug ${dark ? "text-paper/85" : "text-ink-soft"}`}>
                "{r.doctrine}"
              </div>
            </div>

            {/* Capacity bar */}
            <div className={`col-span-12 md:col-span-5 p-5 md:p-6 border-t md:border-t-0 md:border-r ${dark ? "border-paper/15" : "border-ink"}`}>
              <div className="flex items-baseline justify-between mb-2 mono text-[10.5px] tracking-[0.22em] uppercase">
                <span className={dark ? "text-paper/50" : "text-muted-foreground"}>seats</span>
                <span>{r.count.toString().padStart(2,"0")} / {r.capacity.toString().padStart(2,"0")}</span>
              </div>
              <div className={`h-3 w-full relative overflow-hidden ${dark ? "bg-paper/15" : "bg-ink/8"}`}
                style={{ width: `${(r.capacity / max) * 100}%` }}
              >
                <motion.div
                  className="h-full bg-acid"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${filledRatio * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.06, ease: [0.7,0,0.2,1] }}
                />
              </div>
              <div className={`mt-3 mono text-[10px] tracking-[0.22em] uppercase ${dark ? "text-paper/50" : "text-muted-foreground"}`}>
                {r.capacity - r.count > 0 ? `${r.capacity - r.count} open · recruiting` : "full · waitlist"}
              </div>
            </div>

            {/* Status */}
            <div className={`col-span-12 md:col-span-2 p-5 md:p-6 flex flex-col justify-between border-t md:border-t-0 ${dark ? "bg-ink" : "bg-paper-deep"}`}>
              <div className={`mono text-[10.5px] tracking-[0.22em] uppercase ${dark ? "text-paper/50" : "text-muted-foreground"}`}>
                status
              </div>
              <div className={`display font-black text-2xl md:text-3xl tracking-tighter ${r.count > 0 ? "text-acid" : ""}`}>
                {r.count > 0 ? "ACTIVE" : "OPEN"}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
