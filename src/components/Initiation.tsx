import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Initiation() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ handle: "", proof: "", cell: "FORGE" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.handle || !form.proof) {
      toast({ title: "Missing fields", description: "Handle and proof of work are required." });
      return;
    }
    if (form.handle.length > 64 || form.proof.length > 500) {
      toast({ title: "Too long", description: "Keep handle ≤ 64 and proof ≤ 500 characters." });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-initiation", {
        body: { handle: form.handle, cell: form.cell, proof: form.proof },
      });

      if (error) throw new Error(error.message ?? "Submission failed.");
      if (data && (data as { error?: string }).error) {
        throw new Error((data as { error: string }).error);
      }

      setSubmitted(true);
      toast({
        title: "Initiation request received",
        description: `Filed under cell ${form.cell}. The Council reviews on the next cycle.`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error.";
      toast({ title: "Could not file request", description: message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="initiation" className="border-t border-ink bg-ink text-paper relative overflow-hidden">
      {/* grid backdrop */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--paper)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--paper)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container py-20 md:py-32 relative">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* Left — pitch */}
          <div className="col-span-12 lg:col-span-7">
            <div className="mono text-[10.5px] tracking-[0.25em] uppercase text-paper/60 mb-4 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-acid rounded-full dot-pulse" />
              05 ——— initiation · window 04 open
            </div>

            <h2 className="display font-black uppercase tracking-[-0.025em] leading-[0.82] text-7xl md:text-8xl xl:text-9xl">
              Earn <br/>
              <span className="italic font-light text-acid">the mark.</span>
            </h2>

            <p className="mt-8 max-w-xl text-[15.5px] leading-relaxed text-paper/85">
              We open five seats per quarter. There is no résumé filter, no interview loop,
              no warm intro. You submit one piece of shipped work — a repo, a paper, a system —
              and a captain decides within seven days. If the work is real, the gauntlet begins.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px bg-paper/20 border border-paper/20 max-w-md">
              {[
                ["Seats / cycle", "05"],
                ["Decision SLA", "7d"],
                ["Initiate run", "12w"],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink p-4">
                  <div className="mono text-[10px] tracking-[0.22em] uppercase text-paper/50">{k}</div>
                  <div className="display font-black text-3xl mt-2 tracking-tighter">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — request form */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-acid bg-paper text-ink p-7 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="mono text-[10.5px] tracking-[0.22em] uppercase">request_initiation()</div>
                <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground">04 / open</div>
              </div>

              {submitted ? (
                <div className="py-10 text-center">
                  <div className="display font-black text-4xl mb-3">Filed.</div>
                  <p className="text-[14px] leading-relaxed text-ink-soft">
                    Your request is in the queue under cell{" "}
                    <span className="mono bg-ink text-paper px-1.5 py-0.5">{form.cell}</span>.
                    A captain will respond within seven days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ handle: "", proof: "", cell: "FORGE" }); }}
                    className="mt-6 inline-flex items-center gap-2 mono text-[11px] tracking-[0.2em] uppercase border border-ink px-4 py-2 hover:bg-ink hover:text-paper"
                  >
                    file another →
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={onSubmit}>
                  <Field label="00 · operator handle">
                    <input
                      value={form.handle}
                      onChange={(e) => setForm({ ...form, handle: e.target.value })}
                      placeholder="@yourhandle"
                      className="w-full bg-transparent border-b border-ink py-2 mono text-sm focus:outline-none focus:border-acid focus:bg-acid/10 transition-colors"
                    />
                  </Field>

                  <Field label="01 · cell of interest">
                    <select
                      value={form.cell}
                      onChange={(e) => setForm({ ...form, cell: e.target.value })}
                      className="w-full bg-transparent border-b border-ink py-2 mono text-sm text-ink focus:outline-none focus:border-acid appearance-none cursor-pointer"
                      style={{ colorScheme: "dark" }}
                    >
                      {["FORGE","PRISM","VAULT","ATLAS","ECHO","RELAY"].map(c => (
                        <option key={c} value={c} className="bg-paper-deep text-ink mono">{c}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="02 · proof of work · single link">
                    <input
                      value={form.proof}
                      onChange={(e) => setForm({ ...form, proof: e.target.value })}
                      placeholder="github.com / arxiv / blog / demo"
                      className="w-full bg-transparent border-b border-ink py-2 mono text-sm focus:outline-none focus:border-acid focus:bg-acid/10 transition-colors"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-4 bg-ink text-paper py-4 mono text-[11.5px] tracking-[0.25em] uppercase hover:bg-acid hover:text-ink transition-colors flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-acid ${submitting ? "animate-pulse" : ""}`} />
                    {submitting ? "filing_request..." : "submit_request()"}
                    <span>{submitting ? "··" : "→"}</span>
                  </button>

                  <p className="mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground leading-relaxed">
                    // by submitting you accept doctrine v2.04 · the mark is removable.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mono text-[10.5px] tracking-[0.22em] uppercase text-muted-foreground mb-1">{label}</div>
      {children}
    </label>
  );
}
