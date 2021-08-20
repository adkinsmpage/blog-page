import dbConnect from "../../lib/dbConnect";
import Post from "../../models/post";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const data = req.body;

  await dbConnect();
  const response = await Post.create({ ...data, author: "Pat" });
  res.status(201).json(response);
}
