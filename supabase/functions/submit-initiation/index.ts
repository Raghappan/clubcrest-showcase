// Codex Syndicate — Initiation request proxy → MongoDB Atlas Data API
// Receives a validated initiation submission and inserts it into the
// `initiations` collection in MongoDB Atlas.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InitiationBody {
  handle: string;
  cell: string;
  proof: string;
}

const ALLOWED_CELLS = ["FORGE", "PRISM", "VAULT", "ATLAS", "ECHO", "RELAY"];

function validate(body: unknown): { ok: true; data: InitiationBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Body must be a JSON object." };
  const b = body as Record<string, unknown>;

  const handle = typeof b.handle === "string" ? b.handle.trim() : "";
  const cell = typeof b.cell === "string" ? b.cell.trim().toUpperCase() : "";
  const proof = typeof b.proof === "string" ? b.proof.trim() : "";

  if (!handle || handle.length > 64) return { ok: false, error: "handle must be 1–64 chars." };
  if (!/^@?[a-zA-Z0-9_.-]+$/.test(handle)) return { ok: false, error: "handle has invalid characters." };
  if (!ALLOWED_CELLS.includes(cell)) return { ok: false, error: "cell must be one of " + ALLOWED_CELLS.join(", ") };
  if (!proof || proof.length > 500) return { ok: false, error: "proof must be 1–500 chars." };
  // Loose URL/domain check — accepts github.com/foo, https://..., etc.
  if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*/i.test(proof)) {
    return { ok: false, error: "proof must look like a link (e.g. github.com/you/repo)." };
  }

  return { ok: true, data: { handle: handle.startsWith("@") ? handle : "@" + handle, cell, proof } };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const MONGODB_DATA_API_URL = Deno.env.get("MONGODB_DATA_API_URL");
  const MONGODB_DATA_API_KEY = Deno.env.get("MONGODB_DATA_API_KEY");

  if (!MONGODB_DATA_API_URL) {
    return new Response(JSON.stringify({ error: "MONGODB_DATA_API_URL is not configured." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!MONGODB_DATA_API_KEY) {
    return new Response(JSON.stringify({ error: "MONGODB_DATA_API_KEY is not configured." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const result = validate(parsed);
  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const document = {
    ...result.data,
    submittedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? "unknown",
    status: "QUEUED",
    cycle: "Q1-2026",
  };

  // MongoDB Atlas Data API — insertOne
  // URL form: https://data.mongodb-api.com/app/<app-id>/endpoint/data/v1
  // We append /action/insertOne
  try {
    const endpoint = MONGODB_DATA_API_URL.replace(/\/$/, "") + "/action/insertOne";
    const mongoRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "apiKey": MONGODB_DATA_API_KEY,
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "codex_syndicate",
        collection: "initiations",
        document,
      }),
    });

    const text = await mongoRes.text();
    if (!mongoRes.ok) {
      console.error("Mongo insert failed", mongoRes.status, text);
      return new Response(
        JSON.stringify({ error: "Upstream storage rejected the request.", status: mongoRes.status, detail: text.slice(0, 300) }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let mongoJson: { insertedId?: string } = {};
    try { mongoJson = JSON.parse(text); } catch { /* ignore */ }

    return new Response(
      JSON.stringify({
        success: true,
        id: mongoJson.insertedId ?? null,
        cell: document.cell,
        submittedAt: document.submittedAt,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("submit-initiation error:", message);
    return new Response(
      JSON.stringify({ error: "Failed to submit initiation request.", detail: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
