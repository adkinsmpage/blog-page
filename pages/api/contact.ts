import dbConnect from "../../lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const data = req.body;

  res.status(201).send(data);
}
