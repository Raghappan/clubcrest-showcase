import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb+srv://Vercel-Admin-atlas-champagne-helmet:JSSvwf7MAFGCXbNP@atlas-champagne-helmet.eaufk2l.mongodb.net/?retryWrites=true&w=majority")

const operations = [
  { code: "OP-014", name: "Lighthouse", cell: "FORGE",    status: "SHIPPED", desc: "Edge-deployed observability primitives.",        week: 41 },
  { code: "OP-019", name: "Black Iris", cell: "VAULT",    status: "ACTIVE",  desc: "Zero-knowledge identity protocol.",              week: 22 },
  { code: "OP-021", name: "Parallax",   cell: "PRISM",    status: "ACTIVE",  desc: "WebGPU-rendered design canvas.",                 week: 14 },
  { code: "OP-024", name: "Atlas",      cell: "ATLAS",    status: "REVIEW",  desc: "Open civic-data atlas of Indian cities.",        week:  8 },
  { code: "OP-027", name: "Cinder",     cell: "FORGE",    status: "ACTIVE",  desc: "Self-hosted CI runtime, sub-second cold start.", week: 11 },
  { code: "OP-031", name: "Halcyon",    cell: "ECHO",     status: "DRAFT",   desc: "On-device LLM gateway for low-latency agents.",  week:  3 },
  { code: "OP-033", name: "Riverbed",   cell: "RELAY",    status: "ACTIVE",  desc: "Substrate for collaborative realtime apps.",     week:  6 },
  { code: "OP-036", name: "Obsidian",   cell: "DOCTRINE", status: "DRAFT",   desc: "The internal canon — a living engineering doctrine.", week: 2 },
]

const operators = [
  { handle: "@arclite", name: "K. Vaarsa",  rank: "cto",    cell: "CHAIR",  region: "BLR", specialty: "Systems architecture", joined: "W01" },
  { handle: "@ferrum",  name: "R. Kapadia", rank: "senior", cell: "FORGE",  region: "BLR", specialty: "Infra / Rust",         joined: "W02" },
  { handle: "@cobalt",  name: "S. Menon",   rank: "mid",    cell: "PRISM",  region: "MAA", specialty: "Interfaces / Motion",  joined: "W02" },
  { handle: "@helio",   name: "D. Joshi",   rank: "junior", cell: "ATLAS",  region: "PUN", specialty: "Maps / Data",          joined: "W03" },
  { handle: "@vector",  name: "T. Bhalla",  rank: "intern", cell: "VAULT",  region: "DEL", specialty: "Security / Auth",      joined: "W03" },
]

async function seed() {
  await client.connect()
  const db = client.db('clubcrest')
  
  await db.collection('operations').deleteMany({})
  await db.collection('operations').insertMany(operations)
  console.log('Seeded 8 operations!')
  
  await db.collection('operators').deleteMany({})
  await db.collection('operators').insertMany(operators)
  console.log('Seeded 5 operators!')
  
  await client.close()
}

seed()