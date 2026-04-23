// Codex Syndicate — Initiation request handler → MongoDB (official Node driver)
// Inserts validated submissions into the `initiations` collection of the
// `codex_syndicate` database in MongoDB Atlas.

import { MongoClient } from "npm:mongodb@6.10.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_CELLS = ["FORGE", "PRISM", "VAULT", "ATLAS", "ECHO", "RELAY"];

interface InitiationBody {
  handle: string;
  cell: string;
  proof: string;
}

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
  if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*/i.test(proof)) {
    return { ok: false, error: "proof must look like a link (e.g. github.com/you/repo)." };
  }

  return { ok: true, data: { handle: handle.startsWith("@") ? handle : "@" + handle, cell, proof } };
}

// Reuse the connection across invocations (warm starts)
let cachedClient: MongoClient | null = null;

async function getClient(uri: string): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, {
    // Edge runtime is short-lived; keep timeouts tight.
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });
  await client.connect();
  cachedClient = client;
  return client;
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

  // Stored under MONGODB_DATA_API_URL for legacy reasons — value is the mongodb+srv:// string.
  const MONGO_URI = Deno.env.get("MONGODB_DATA_API_URL");
  if (!MONGO_URI) {
    return new Response(JSON.stringify({ error: "MONGODB_DATA_API_URL is not configured." }), {
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

  try {
    const client = await getClient(MONGO_URI);
    const db = client.db("codex_syndicate");
    const coll = db.collection("initiations");
    const insertResult = await coll.insertOne(document);

    return new Response(
      JSON.stringify({
        success: true,
        id: insertResult.insertedId?.toString() ?? null,
        cell: document.cell,
        submittedAt: document.submittedAt,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("submit-initiation error:", message);
    // Reset cached client so the next invocation can reconnect.
    cachedClient = null;
    return new Response(
      JSON.stringify({ error: "Failed to submit initiation request.", detail: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
