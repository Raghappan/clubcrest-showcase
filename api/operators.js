import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.password_is_optional_MONGODB_URI)

export default async function handler(req, res) {
  await client.connect()
  const db = client.db('clubcrest')
  const collection = db.collection('operators')

  if (req.method === 'GET') {
    const operators = await collection.find({}).toArray()
    return res.status(200).json(operators)
  }

  if (req.method === 'POST') {
    const operator = await collection.insertOne(req.body)
    return res.status(201).json(operator)
  }
}