import { motion } from "framer-motion";
import { TOTAL_MEMBERS, RANKS } from "@/data/syndicate";

export default function Hero() {
  return (
    <section id="top" className="relative border-t border-ink overflow-hidden">
      {/* Vertical column rules */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container h-full grid grid-cols-12 gap-0">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className={i === 0 || i === 12 ? "" : "border-l border-ink/8"} />
          ))}
        </div>
      </div>

      <div className="container relative pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Tag row */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-acid text-ink mono text-[10.5px] tracking-[0.2em] uppercase font-medium">
              ◆ A DXL · CODEX GUILD
            </span>
            <span className="hidden sm:inline-flex mono text-[10.5px] tracking-[0.2em] uppercase text-muted-foreground">
              EST. 2024 · BENGALURU
            </span>
          </div>
          <div className="hidden sm:block mono text-[10.5px] tracking-[0.2em] uppercase text-muted-foreground">
            // dossier — public extract
          </div>
        </div>

        {/* Master headline */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              ——— a hierarchy of builders
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

          {/* Right column — counter + paragraph */}
          <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-ink space-y-8">
            <div>
              <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                Active operators
              </div>
              <div className="display font-black text-7xl md:text-8xl leading-none tracking-tighter">
                {TOTAL_MEMBERS.toString().padStart(2, "0")}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 mono text-[11px]">
                {RANKS.slice(0, 6).map((r) => (
                  <div key={r.id} className="flex items-center justify-between border-b border-ink/15 py-1">
                    <span className="text-muted-foreground tracking-wider">{r.code} {r.title}</span>
                    <span className="font-medium">{r.count.toString().padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[15px] leading-relaxed max-w-md">
              <span className="font-bold">Codex Syndicate</span> is a private guild of engineers,
              designers and operators inside DXL. We are <em>not</em> a community —
              we are a chain of command, mentored from <span className="mono text-[12px] bg-ink text-paper px-1.5 py-0.5">R5</span> to{" "}
              <span className="mono text-[12px] bg-acid text-ink px-1.5 py-0.5">R0</span>, and we ship in cells.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#hierarchy"
                className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 mono text-[11px] tracking-[0.2em] uppercase hover:bg-acid hover:text-ink transition-colors"
              >
                <span>view the hierarchy</span>
                <span>↘</span>
              </a>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 border border-ink px-5 py-3 mono text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-paper transition-colors"
              >
                read the manifesto
              </a>
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-ink">
          {[
            ["Cells active", "08"],
            ["Operations live", "07"],
            ["Doctrine version", "2.04"],
            ["Initiation seats", "05 / open"],
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
