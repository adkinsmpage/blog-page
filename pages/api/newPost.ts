import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const data = req.body;

  const client = await MongoClient.connect(process.env.MONGODB_LINK!);

  const db = client.db("nextBlog");
  const collection = db.collection("posts");
  const response = await collection.insertOne(data);
  console.log(response);
  res.status(201).json(response);
}
