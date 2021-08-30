import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "DELETE") {
    dbConnect();
    const data = await Post.findByIdAndDelete(id);
    if (!data) res.status(404).send({ message: "post not found" });
    res.status(200).send({ message: "post deleted" });
  }
}
