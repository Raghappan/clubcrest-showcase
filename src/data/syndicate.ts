// Codex Syndicate seed data — fully fictional, narrative-rich.

export type Rank = {
  id: string;
  index: number;          // 01..06
  code: string;           // R0..R5
  title: string;
  subtitle: string;
  count: number;
  threshold: number;      // points to reach
  doctrine: string;
};

export const RANKS: Rank[] = [
  { id: "architect", index: 1, code: "R0", title: "Architect",  subtitle: "The chair · sets doctrine", count: 1,  threshold: 9000, doctrine: "Designs systems others inhabit." },
  { id: "council",   index: 2, code: "R1", title: "Council",    subtitle: "Three seats · doctrine review", count: 3,  threshold: 6500, doctrine: "Audits every commit to the canon." },
  { id: "captain",   index: 3, code: "R2", title: "Captain",    subtitle: "Cell leads · ship & defend", count: 6,  threshold: 4200, doctrine: "Owns a vertical end-to-end." },
  { id: "operator",  index: 4, code: "R3", title: "Operator",   subtitle: "Senior makers", count: 14, threshold: 2400, doctrine: "Closes complex problems quietly." },
  { id: "initiate",  index: 5, code: "R4", title: "Initiate",   subtitle: "Sworn in · in the gauntlet", count: 21, threshold: 800,  doctrine: "Earns the mark through the work." },
  { id: "applicant", index: 6, code: "R5", title: "Applicant",  subtitle: "Under review", count: 5,  threshold: 0,    doctrine: "Submits the proof. Awaits the call." },
];

export const TOTAL_MEMBERS = RANKS.reduce((s, r) => s + r.count, 0);

export type Operator = {
  handle: string;
  name: string;
  rank: string;        // rank id
  cell: string;
  points: number;
  delta: number;       // weekly point change
  region: string;
  specialty: string;
  streak: number;      // weeks active
};

export const OPERATORS: Operator[] = [
  { handle: "@arclite",   name: "K. Vaarsa",      rank: "architect", cell: "CHAIR",   points: 9842, delta:  0,  region: "BLR", specialty: "Systems",        streak: 184 },
  { handle: "@orbital",   name: "M. Sundar",      rank: "council",   cell: "DOCTRINE",points: 7610, delta: 42,  region: "DEL", specialty: "Doctrine",       streak:  96 },
  { handle: "@nullroute", name: "P. Iyer",        rank: "council",   cell: "DOCTRINE",points: 7204, delta: 18,  region: "BOM", specialty: "Compilers",      streak:  84 },
  { handle: "@signal",    name: "A. Khatri",      rank: "council",   cell: "DOCTRINE",points: 6911, delta: 24,  region: "BLR", specialty: "Cryptography",   streak:  71 },
  { handle: "@ferrum",    name: "R. Kapadia",     rank: "captain",   cell: "FORGE",   points: 5402, delta: 88,  region: "BLR", specialty: "Infra",          streak:  62 },
  { handle: "@cobalt",    name: "S. Menon",       rank: "captain",   cell: "PRISM",   points: 5188, delta: 64,  region: "MAA", specialty: "Interfaces",     streak:  58 },
  { handle: "@helio",     name: "D. Joshi",       rank: "captain",   cell: "ATLAS",   points: 4980, delta: 51,  region: "PUN", specialty: "Maps & Data",    streak:  47 },
  { handle: "@vector",    name: "T. Bhalla",      rank: "captain",   cell: "VAULT",   points: 4760, delta: 33,  region: "DEL", specialty: "Security",       streak:  44 },
  { handle: "@quanta",    name: "L. Suri",        rank: "captain",   cell: "ECHO",    points: 4520, delta: 41,  region: "BLR", specialty: "ML Systems",     streak:  40 },
  { handle: "@drift",     name: "N. Pandey",      rank: "captain",   cell: "RELAY",   points: 4310, delta: 29,  region: "HYD", specialty: "Realtime",       streak:  37 },
  { handle: "@oxide",     name: "V. Chen",        rank: "operator",  cell: "FORGE",   points: 3702, delta: 112, region: "BLR", specialty: "Rust / Infra",   streak:  29 },
  { handle: "@neon",      name: "I. Saxena",      rank: "operator",  cell: "PRISM",   points: 3601, delta: 96,  region: "MAA", specialty: "Motion",         streak:  31 },
  { handle: "@halide",    name: "F. D'Souza",     rank: "operator",  cell: "VAULT",   points: 3490, delta: 78,  region: "BOM", specialty: "Auth",           streak:  26 },
  { handle: "@parallax",  name: "G. Mehta",       rank: "operator",  cell: "PRISM",   points: 3340, delta: 71,  region: "DEL", specialty: "3D / WebGL",     streak:  23 },
  { handle: "@cipher",    name: "Z. Ali",         rank: "operator",  cell: "VAULT",   points: 3210, delta: 60,  region: "HYD", specialty: "Cryptography",   streak:  25 },
  { handle: "@tundra",    name: "B. Rao",         rank: "operator",  cell: "ATLAS",   points: 3080, delta: 49,  region: "BLR", specialty: "Geo",            streak:  22 },
  { handle: "@apex",      name: "S. Iqbal",       rank: "operator",  cell: "ECHO",    points: 2980, delta: 44,  region: "PUN", specialty: "LLM ops",        streak:  19 },
  { handle: "@granite",   name: "H. Nair",        rank: "operator",  cell: "FORGE",   points: 2860, delta: 33,  region: "MAA", specialty: "DB internals",   streak:  18 },
  { handle: "@flux",      name: "O. Verma",       rank: "operator",  cell: "RELAY",   points: 2740, delta: 28,  region: "DEL", specialty: "Streaming",      streak:  16 },
  { handle: "@vortex",    name: "C. Reddy",       rank: "operator",  cell: "ECHO",    points: 2630, delta: 22,  region: "HYD", specialty: "Vector search",  streak:  14 },
];

// Eight active "operations" — internal projects.
export const OPERATIONS = [
  { code: "OP-014", name: "Lighthouse",    cell: "FORGE",  status: "SHIPPED", desc: "Edge-deployed observability primitives.", week: 41 },
  { code: "OP-019", name: "Black Iris",    cell: "VAULT",  status: "ACTIVE",  desc: "Zero-knowledge identity protocol.",       week: 22 },
  { code: "OP-021", name: "Parallax",      cell: "PRISM",  status: "ACTIVE",  desc: "WebGPU-rendered design canvas.",          week: 14 },
  { code: "OP-024", name: "Atlas",         cell: "ATLAS",  status: "REVIEW",  desc: "Open civic-data atlas of Indian cities.", week:  8 },
  { code: "OP-027", name: "Cinder",        cell: "FORGE",  status: "ACTIVE",  desc: "Self-hosted CI runtime, sub-second cold start.", week: 11 },
  { code: "OP-031", name: "Halcyon",      cell: "ECHO",   status: "DRAFT",   desc: "On-device LLM gateway for low-latency agents.", week:  3 },
  { code: "OP-033", name: "Riverbed",      cell: "RELAY",  status: "ACTIVE",  desc: "Substrate for collaborative realtime apps.", week:  6 },
  { code: "OP-036", name: "Obsidian",      cell: "DOCTRINE", status: "DRAFT", desc: "The internal canon — a living engineering doctrine.", week:  2 },
];

// Cells = teams
export const CELLS = ["FORGE", "PRISM", "VAULT", "ATLAS", "ECHO", "RELAY", "DOCTRINE", "CHAIR"];
