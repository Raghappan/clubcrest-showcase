import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.password_is_optional_MONGODB_URI)

export default async function handler(req, res) {
  await client.connect()
  const db = client.db('clubcrest')
  const collection = db.collection('operations')

  if (req.method === 'GET') {
    const operations = await collection.find({}).toArray()
    return res.status(200).json(operations)
  }

  if (req.method === 'POST') {
    const operation = await collection.insertOne(req.body)
    return res.status(201).json(operation)
  }
}