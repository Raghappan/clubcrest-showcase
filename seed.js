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

async function seed() {
  await client.connect()
  const db = client.db('clubcrest')
  const collection = db.collection('operations')
  await collection.deleteMany({}) // clear existing
  await collection.insertMany(operations)
  console.log('Seeded 8 operations!')
  await client.close()
}

seed()