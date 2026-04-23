import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "TRIAL · L1 PROMOTION GAUNTLET · LIVE",
  "OP-014 LIGHTHOUSE · SHIPPED",
  "@oxide promoted → OPERATOR",
  "Initiation window 04 · open",
  "Cell PRISM · 7-day streak",
  "Doctrine v2.04 · ratified",
  "OP-027 CINDER · cold-start 412ms",
  "@neon · weekly delta +96",
  "Council seat 03 · contested",
  "D:XL parent network · synced",
];

export default function SystemBar() {
  return (
    <div className="w-full border-y border-ink bg-ink text-paper">
      <div className="flex items-stretch">
        {/* Left status */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 border-r border-paper/20">
          <span className="inline-block w-2 h-2 rounded-full bg-acid dot-pulse" />
          <span className="mono text-[10.5px] tracking-[0.2em] uppercase">SYSTEM · LIVE</span>
        </div>
        <div className="hidden md:flex items-center px-4 py-2 border-r border-paper/20 mono text-[10.5px] tracking-[0.2em] uppercase">
          {new Date().toUTCString().slice(0, 22)} UTC
        </div>
        <div className="hidden md:flex items-center px-4 py-2 border-r border-paper/20 mono text-[10.5px] tracking-[0.2em] uppercase">
          NODE · BLR-01
        </div>

        {/* Marquee */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            className="flex whitespace-nowrap mono text-[11px] tracking-[0.18em] uppercase py-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className="px-6 flex items-center gap-3">
                <span className="text-acid">◆</span>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="hidden md:flex items-center px-4 py-2 border-l border-paper/20 mono text-[10.5px] tracking-[0.2em] uppercase">
          v 2.04
        </div>
      </div>
    </div>
  );
}
