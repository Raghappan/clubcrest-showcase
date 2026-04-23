import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    n: "I.",
    head: "Doctrine over opinion.",
    body: "We do not argue from taste. The canon is written, versioned, and reviewed. Any operator can propose; only the Council ratifies.",
  },
  {
    n: "II.",
    head: "Rank is earned, not assigned.",
    body: "Promotion follows shipped work and mentored juniors. There is no political ascent inside the Syndicate — only a public point ledger and a sworn captain.",
  },
  {
    n: "III.",
    head: "Cells, not committees.",
    body: "Work happens in small cells of three to five operators with a captain. Cells own a single problem, end-to-end, until it is shipped or sunset.",
  },
  {
    n: "IV.",
    head: "Quiet by default.",
    body: "We post outcomes, not opinions. No personal brand-building inside the guild. The work is the broadcast.",
  },
  {
    n: "V.",
    head: "Mentorship is mandatory.",
    body: "Every operator above L3 takes one initiate per quarter. You do not graduate the Syndicate — you reproduce it.",
  },
  {
    n: "VI.",
    head: "The mark is removable.",
    body: "Membership is conditional on the doctrine. Violating the canon costs rank. Violating it twice costs the seat.",
  },
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="border-t border-ink">
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              01 ——— manifesto
            </div>
            <h2 className="display font-black uppercase tracking-[-0.02em] text-6xl md:text-7xl leading-[0.85]">
              Six lines.<br/>
              <span className="italic font-light">No more.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed">
              The doctrine of the Codex Syndicate fits on a single index card.
              Everything else is an operating procedure. Everything procedural
              is changeable; the six are not.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 mono text-[11px] tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-acid" />
              ratified · doctrine v2.04
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-ink border border-ink">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                className="bg-paper p-7 group hover:bg-acid transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="display font-black text-3xl">{p.n}</div>
                  <div className="mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground group-hover:text-ink/70">
                    canon · {String(i+1).padStart(2,"0")} / 06
                  </div>
                </div>
                <h3 className="display font-bold text-xl md:text-2xl tracking-tight leading-tight mb-3">{p.head}</h3>
                <p className="text-[13.5px] leading-relaxed text-ink-soft group-hover:text-ink">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
