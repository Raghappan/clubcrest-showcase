import { motion } from "framer-motion";

export default function Nav() {
  return (
    <header className="w-full">
      <div className="container flex items-center justify-between py-5">
        {/* Mark */}
        <a href="#top" className="flex items-center gap-3 group">
          <motion.svg
            width="28" height="28" viewBox="0 0 28 28"
            initial={{ rotate: 0 }} whileHover={{ rotate: 90 }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
            className="shrink-0"
          >
            <rect x="2" y="2" width="24" height="24" fill="hsl(var(--ink))" />
            <rect x="6" y="6" width="16" height="16" fill="hsl(var(--acid))" />
            <rect x="11" y="11" width="6" height="6" fill="hsl(var(--ink))" />
          </motion.svg>
          <div className="leading-none">
            <div className="display font-black tracking-tight text-[15px] uppercase">Codex Syndicate</div>
            <div className="mono text-[9.5px] tracking-[0.25em] text-muted-foreground uppercase mt-0.5">DXL · GUILD 014</div>
          </div>
        </a>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-9 mono text-[11.5px] tracking-[0.18em] uppercase">
          <a href="#manifesto" className="reveal-link"><span className="text-acid mr-1">01</span>Manifesto</a>
          <a href="#hierarchy" className="reveal-link"><span className="text-acid mr-1">02</span>Hierarchy</a>
          <a href="#operators" className="reveal-link"><span className="text-acid mr-1">03</span>Operators</a>
          <a href="#operations" className="reveal-link"><span className="text-acid mr-1">04</span>Operations</a>
          <a href="#initiation" className="reveal-link"><span className="text-acid mr-1">05</span>Initiation</a>
        </nav>

        {/* CTA */}
        <a
          href="#initiation"
          className="group inline-flex items-center gap-2 border border-ink px-4 py-2.5 mono text-[11px] tracking-[0.2em] uppercase bg-ink text-paper hover:bg-acid hover:text-ink transition-colors"
        >
          <span className="w-1.5 h-1.5 bg-acid group-hover:bg-ink rounded-full dot-pulse" />
          request_access
          <span className="ml-1">→</span>
        </a>
      </div>
    </header>
  );
}
