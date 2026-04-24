import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export default async function handler(req, res) {
  await client.connect()
  const db = client.db('clubcrest')
  const collection = db.collection('clubs')

  if (req.method === 'GET') {
    const clubs = await collection.find({}).toArray()
    return res.status(200).json(clubs)
  }

  if (req.method === 'POST') {
    const club = await collection.insertOne(req.body)
    return res.status(201).json(club)
  }
}