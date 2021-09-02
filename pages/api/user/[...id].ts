import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const editorId = req.query.id[0];
    const user = req.query.id[1];
    const editor = await User.findById(editorId);
    if (!editor.isAdmin) {
      return res.status(401).send({ message: "user not authorized" });
    }
    const deleted = await User.findByIdAndDelete(user);
    if (!deleted) res.status(404).send({ message: "something went wrong" });
    res.send({ message: "user deleted" });
  }
}
