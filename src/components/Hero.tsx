import { motion } from "framer-motion";
import { RECRUITMENT, IC_RANKS, MGMT_RANKS } from "@/data/syndicate";

export default function Hero() {
  const pct = Math.round((RECRUITMENT.filled / RECRUITMENT.target) * 100);

  return (
    <section id="top" className="relative border-t border-ink overflow-hidden">
      {/* Drifting ember glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="ember-a absolute -top-32 -left-20 w-[55vw] h-[55vw] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--acid) / 0.18), transparent 65%)" }}
        />
        <div
          className="ember-b absolute -bottom-40 -right-24 w-[45vw] h-[45vw] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--acid) / 0.12), transparent 65%)" }}
        />
        {/* Scanning horizontal line */}
        <div
          className="scan-line absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--acid) / 0.55), transparent)" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="container h-full grid grid-cols-12 gap-0">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className={i === 0 || i === 12 ? "" : "border-l border-rule/60"} />
          ))}
        </div>
      </div>

      <div className="container relative pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Tag row */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2 py-1 bg-acid text-ink mono text-[10.5px] tracking-[0.2em] uppercase font-medium">
              ◆ DXL · CODEX SYNDICATES
            </span>
            <span className="hidden sm:inline-flex mono text-[10.5px] tracking-[0.2em] uppercase text-muted-foreground">
              EST. 2024 · BENGALURU
            </span>
          </div>
          <div className="hidden sm:block mono text-[10.5px] tracking-[0.2em] uppercase text-muted-foreground">
            // public dossier · v2.04
          </div>
        </div>

        {/* Master headline */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              ——— eleven rungs · two tracks · one ladder
            </div>

            <h1 className="display font-black uppercase leading-[0.82] tracking-[-0.025em] text-[18vw] sm:text-[15vw] lg:text-[12rem] xl:text-[14rem]">
              <motion.span
                className="block"
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .9, ease: [.2,.7,.2,1] }}
              >Built.</motion.span>
              <motion.span
                className="block italic font-light"
                style={{ fontFamily: "var(--font-display)" }}
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .9, delay: .12, ease: [.2,.7,.2,1] }}
              >ranked.</motion.span>
              <motion.span
                className="block"
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .9, delay: .24, ease: [.2,.7,.2,1] }}
              >
                Not <span className="relative inline-block">
                  born.
                  <motion.span
                    className="absolute left-0 right-0 -bottom-1 h-[10px] bg-acid -z-10"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: [.7,0,.2,1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </motion.span>
            </h1>
          </div>

          {/* Right column — recruitment counter + paragraph */}
          <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-ink space-y-8">
            <div>
              <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-acid rounded-full dot-pulse" />
                tech syndicates recruited
              </div>
              <div className="display font-black text-7xl md:text-8xl leading-none tracking-tighter flex items-baseline gap-2 text-acid">
                {String(RECRUITMENT.filled).padStart(2, "0")}
                <span className="text-3xl md:text-4xl">/{RECRUITMENT.target}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full bg-ink/10 relative overflow-hidden">
                <motion.div
                  className="h-full bg-acid"
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.4, delay: 0.5, ease: [0.7,0,0.2,1] }}
                />
              </div>
              <div className="mt-2 mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground flex justify-between">
                <span>cycle · {RECRUITMENT.cycle}</span>
                <span>{pct}% filled</span>
              </div>

              {/* Track split */}
              <div className="mt-6 grid grid-cols-2 gap-2 mono text-[11px]">
                <div className="border border-ink p-3">
                  <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">IC track</div>
                  <div className="display font-black text-2xl mt-1 leading-none">
                    {IC_RANKS.reduce((s, r) => s + r.count, 0)}
                    <span className="text-sm text-muted-foreground">/{IC_RANKS.reduce((s, r) => s + r.capacity, 0)}</span>
                  </div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-1">L0 → DE</div>
                </div>
                <div className="border border-ink p-3 bg-ink text-paper">
                  <div className="text-[10px] tracking-[0.22em] uppercase opacity-60">MGMT fork</div>
                  <div className="display font-black text-2xl mt-1 leading-none">
                    {MGMT_RANKS.reduce((s, r) => s + r.count, 0)}
                    <span className="text-sm opacity-60">/{MGMT_RANKS.reduce((s, r) => s + r.capacity, 0)}</span>
                  </div>
                  <div className="text-[10px] tracking-[0.22em] uppercase opacity-60 mt-1">EM → CTO</div>
                </div>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed max-w-md">
              <span className="font-bold">Codex Syndicates</span> is the engineering guild
              of D:XL. We've sworn in <span className="mono bg-acid text-ink px-1.5 py-0.5 text-[12px]">{RECRUITMENT.filled}/50</span> tech syndicates and the ladder is open —
              eleven rungs, an IC track and a management fork at Senior. No politics. Only the work.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#hierarchy"
                className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 mono text-[11px] tracking-[0.2em] uppercase hover:bg-acid hover:text-ink transition-colors"
              >
                <span>view the ladder</span>
                <span>↘</span>
              </a>
              <a
                href="#initiation"
                className="inline-flex items-center gap-2 border border-ink px-5 py-3 mono text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-paper transition-colors"
              >
                request a seat
              </a>
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-ink">
          {[
            ["Ladder rungs", "11"],
            ["Cells active", String(RECRUITMENT.cellsActive).padStart(2,"0")],
            ["Operations live", String(RECRUITMENT.opsLive).padStart(2,"0")],
            ["Doctrine", "v2.04"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`py-5 px-4 ${i !== 0 ? "md:border-l" : ""} ${i % 2 !== 0 ? "border-l" : ""} border-ink`}
            >
              <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground">{k}</div>
              <div className="display font-black text-3xl mt-2 tracking-tighter">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
