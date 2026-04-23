import { motion } from "framer-motion";
import { OPERATIONS } from "@/data/syndicate";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE:  "bg-acid text-ink",
  SHIPPED: "bg-ink text-paper",
  REVIEW:  "bg-paper-deep text-ink border border-ink",
  DRAFT:   "bg-paper text-muted-foreground border border-dashed border-ink/40",
};

export default function Operations() {
  return (
    <section id="operations" className="border-t border-ink bg-paper-deep">
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mb-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              04 ——— operations
            </div>
            <h2 className="display font-black uppercase tracking-[-0.02em] text-6xl md:text-7xl leading-[0.85]">
              What the<br/>cells <span className="italic font-light">ship.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6 lg:border-l lg:border-ink">
            <p className="text-[15px] leading-relaxed max-w-2xl">
              An operation is owned by exactly one cell, led by one captain, and lives
              on a single line in the public ledger until it is shipped or sunset.
              No operation runs longer than 16 weeks without Council review.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink border border-ink">
          {OPERATIONS.map((op, i) => (
            <motion.article
              key={op.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.2,0.7,0.2,1] }}
              className="bg-paper p-6 flex flex-col group hover:bg-acid transition-colors duration-300 min-h-[260px]"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground group-hover:text-ink/70">
                  {op.code}
                </span>
                <span className={`mono text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 ${STATUS_STYLES[op.status]} group-hover:bg-ink group-hover:text-paper`}>
                  {op.status}
                </span>
              </div>

              <h3 className="display font-black uppercase tracking-tight text-3xl leading-none mb-1">
                {op.name}
              </h3>
              <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground group-hover:text-ink/70 mb-5">
                cell · {op.cell}
              </div>

              <p className="text-[13.5px] leading-relaxed text-ink-soft group-hover:text-ink mb-auto">
                {op.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-ink/15 group-hover:border-ink/40 flex items-end justify-between">
                <div>
                  <div className="mono text-[9.5px] tracking-[0.22em] uppercase opacity-60">week</div>
                  <div className="display font-black text-2xl leading-none">{String(op.week).padStart(2,"0")}</div>
                </div>
                <span className="mono text-[11px] tracking-[0.2em] uppercase">dossier →</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
