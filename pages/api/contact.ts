import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const data = req.body;
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
    secure: true,
  });

  const mailData = {
    from: req.body.email,
    to: process.env.email,
    subject: `Message From ${req.body.name}`,
    text: `${req.body.content} from ${req.body.email}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) res.status(404).send({ message: err.message });
    else res.status(201).send({ message: "message sent" });
  });
}
