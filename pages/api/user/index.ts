import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "../../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const newData = req.body.data;

    if (newData.password) {
      const salt = await bcrypt.genSalt(12);
      newData.password = await bcrypt.hash(newData.password, salt);
    }
    const user = await User.findByIdAndUpdate(
      req.body.id,
      { ...newData },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "user not found" });
    res.send({ message: "user updated" });
  }
  if (req.method === "PATCH") {
    const { editorId, id, email, name, isAdmin } = req.body;
    const editor = await User.findById(editorId);
    if (!editor.isAdmin) {
      return res.status(401).send({ message: "user not authorized" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, {
      email,
      name,
      isAdmin,
    });
    if (!updatedUser) res.status(404).send({ message: "something went wrong" });
    res.send({ message: "userUpdated" });
  }
}
