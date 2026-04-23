// Codex Syndicate — official DXL ladder.
// IC Track (1–7) + Management Fork (8–11). Total 11 levels.

export type Track = "IC" | "MGMT";

export type Rank = {
  id: string;
  index: number;       // 1..11
  code: string;        // L0, L1..L7, M1..M4
  level: string;       // display level tag e.g. "L4–L5"
  title: string;
  subtitle: string;
  track: Track;
  count: number;       // currently filled seats
  capacity: number;    // total seats planned
  doctrine: string;
};

// IC LADDER — 7 rungs
export const IC_RANKS: Rank[] = [
  { id: "intern",       index: 1, code: "L0", level: "L0",     title: "Intern / Trainee",       subtitle: "Entry point · supervised scope",             track: "IC", count: 2, capacity: 8,  doctrine: "Learns the canon. Ships under guidance." },
  { id: "junior",       index: 2, code: "L1", level: "L1–L2",  title: "Junior Developer",       subtitle: "Well-defined tickets · limited ownership",   track: "IC", count: 1, capacity: 10, doctrine: "Earns trust by closing the small things cleanly." },
  { id: "mid",          index: 3, code: "L3", level: "L3",     title: "Software Developer",     subtitle: "Independent on features · owns codebase",    track: "IC", count: 1, capacity: 12, doctrine: "Where most operators spend their career — and quietly become great." },
  { id: "senior",       index: 4, code: "L4", level: "L4–L5",  title: "Senior Software Developer", subtitle: "Designs systems · mentors · estimates",   track: "IC", count: 1, capacity: 8,  doctrine: "Less about years. More about the scope of impact." },
  { id: "staff",        index: 5, code: "L6", level: "L6",     title: "Staff Engineer",         subtitle: "Cross-team · org-level problems",            track: "IC", count: 0, capacity: 4,  doctrine: "Solves what no single team can solve alone." },
  { id: "principal",    index: 6, code: "L7", level: "L7",     title: "Principal Engineer",     subtitle: "Company-wide architectural influence",       track: "IC", count: 0, capacity: 2,  doctrine: "Sets architecture that shapes the product for years." },
  { id: "distinguished",index: 7, code: "DE", level: "D.E.",   title: "Distinguished Engineer", subtitle: "Industry-level impact · the rare seat",       track: "IC", count: 0, capacity: 1,  doctrine: "The chair earned by foundational work the industry depends on." },
];

// MANAGEMENT FORK — 4 rungs (forks at Senior)
export const MGMT_RANKS: Rank[] = [
  { id: "em",       index: 8,  code: "M1", level: "EM",  title: "Engineering Manager",   subtitle: "People · delivery · process",        track: "MGMT", count: 0, capacity: 4, doctrine: "Multiplies the output of the team, not their own." },
  { id: "director", index: 9,  code: "M2", level: "DIR", title: "Director of Engineering", subtitle: "Multiple teams · multiple managers", track: "MGMT", count: 0, capacity: 2, doctrine: "Aligns several cells around a single vector." },
  { id: "vp",       index: 10, code: "M3", level: "VP",  title: "VP of Engineering",     subtitle: "Org-wide engineering leadership",     track: "MGMT", count: 0, capacity: 1, doctrine: "Owns the whole engineering organisation." },
  { id: "cto",      index: 11, code: "M4", level: "CTO", title: "Chief Technology Officer", subtitle: "Top of the technical chain · strategic", track: "MGMT", count: 1, capacity: 1, doctrine: "Sets the long horizon. Carries the technical mandate." },
];

export const ALL_RANKS: Rank[] = [...IC_RANKS, ...MGMT_RANKS];

export const RECRUITMENT = {
  filled: ALL_RANKS.reduce((s, r) => s + r.count, 0),
  target: 50,
  cycle: "Q1 · 2026",
  cellsActive: 8,
  opsLive: 7,
};

// 5 currently recruited "Tech Syndicates" — public roster
export type Operator = {
  handle: string;
  name: string;
  rank: string;     // rank id
  cell: string;
  region: string;
  specialty: string;
  joined: string;   // week tag
};

export const OPERATORS: Operator[] = [
  { handle: "@arclite", name: "K. Vaarsa",  rank: "cto",    cell: "CHAIR",  region: "BLR", specialty: "Systems architecture", joined: "W01" },
  { handle: "@ferrum",  name: "R. Kapadia", rank: "senior", cell: "FORGE",  region: "BLR", specialty: "Infra / Rust",         joined: "W02" },
  { handle: "@cobalt",  name: "S. Menon",   rank: "mid",    cell: "PRISM",  region: "MAA", specialty: "Interfaces / Motion",  joined: "W02" },
  { handle: "@helio",   name: "D. Joshi",   rank: "junior", cell: "ATLAS",  region: "PUN", specialty: "Maps / Data",          joined: "W03" },
  { handle: "@vector",  name: "T. Bhalla",  rank: "intern", cell: "VAULT",  region: "DEL", specialty: "Security / Auth",      joined: "W03" },
];

// Operations — internal projects
export const OPERATIONS = [
  { code: "OP-014", name: "Lighthouse", cell: "FORGE",    status: "SHIPPED", desc: "Edge-deployed observability primitives.",        week: 41 },
  { code: "OP-019", name: "Black Iris", cell: "VAULT",    status: "ACTIVE",  desc: "Zero-knowledge identity protocol.",              week: 22 },
  { code: "OP-021", name: "Parallax",   cell: "PRISM",    status: "ACTIVE",  desc: "WebGPU-rendered design canvas.",                 week: 14 },
  { code: "OP-024", name: "Atlas",      cell: "ATLAS",    status: "REVIEW",  desc: "Open civic-data atlas of Indian cities.",        week:  8 },
  { code: "OP-027", name: "Cinder",     cell: "FORGE",    status: "ACTIVE",  desc: "Self-hosted CI runtime, sub-second cold start.", week: 11 },
  { code: "OP-031", name: "Halcyon",    cell: "ECHO",     status: "DRAFT",   desc: "On-device LLM gateway for low-latency agents.",  week:  3 },
  { code: "OP-033", name: "Riverbed",   cell: "RELAY",    status: "ACTIVE",  desc: "Substrate for collaborative realtime apps.",     week:  6 },
  { code: "OP-036", name: "Obsidian",   cell: "DOCTRINE", status: "DRAFT",   desc: "The internal canon — a living engineering doctrine.", week: 2 },
];

export const CELLS = ["FORGE", "PRISM", "VAULT", "ATLAS", "ECHO", "RELAY", "DOCTRINE", "CHAIR"];
