import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const userData = req.body;
  await dbConnect();
  const response = await User.create({
    name: userData.name,
    password: userData.password,
    email: userData.email,
  });
  res.status(201).json(response);
}
