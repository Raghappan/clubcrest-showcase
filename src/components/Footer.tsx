export default function Footer() {
  return (
    <footer className="border-t border-ink bg-paper">
      <div className="container py-14">
        <div className="grid grid-cols-12 gap-6">
          {/* Mark */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <rect x="2" y="2" width="24" height="24" fill="hsl(var(--ink))" />
                <rect x="6" y="6" width="16" height="16" fill="hsl(var(--acid))" />
                <rect x="11" y="11" width="6" height="6" fill="hsl(var(--ink))" />
              </svg>
              <div className="display font-black uppercase tracking-tight text-lg">Codex Syndicate</div>
            </div>
            <p className="text-[13.5px] leading-relaxed max-w-sm text-ink-soft">
              A private guild within DXL. Built. Ranked. Not born.<br/>
              Doctrine v2.04 — ratified by the Council, Q4.
            </p>
          </div>

          {/* Cols */}
          <FooterCol title="00 — guild" items={["Manifesto", "Hierarchy", "Doctrine", "Cells"]} />
          <FooterCol title="01 — public" items={["Operator ledger", "Operations", "Promotions", "Council notes"]} />
          <FooterCol title="02 — contact" items={["Initiation", "press@codex", "captains@codex", "doctrine@codex"]} />
        </div>

        {/* ASCII rule */}
        <pre className="mono text-[9.5px] tracking-[0.18em] text-ink/40 mt-12 select-none overflow-hidden whitespace-nowrap">
          {"╴".repeat(160)}
        </pre>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 mono text-[10.5px] tracking-[0.22em] uppercase">
          <div>© 2026 · CODEX SYNDICATE · DXL GUILD 014</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-acid rounded-full dot-pulse" />
            system online · node BLR-01
          </div>
          <div className="text-muted-foreground">// the work is the broadcast</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="col-span-6 md:col-span-2">
      <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="reveal-link text-[13.5px]">{it}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
