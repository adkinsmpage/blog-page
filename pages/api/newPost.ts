import dbConnect from "../../lib/dbConnect";
import Post from "../../models/post";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const data = req.body;

  const session = getSession({ req });
  if (!session) {
    res.status(401).send({ message: "Not authenticated" });
    return;
  }

  await dbConnect();
  const response = await Post.create(data);
  res.status(201).json(response);
}
