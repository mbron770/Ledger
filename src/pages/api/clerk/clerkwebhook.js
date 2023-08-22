import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";
import { Webhook } from "svix";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  await connectToDB();
  const payload = req.body;
  const headers = req.headers;
  const clerkSecret = process.env.SIGNINGSECRET;
  const heads = {
    "svix-id": headers["svix-id"],
    "svix-timestamp": headers["svix-timestamp"],
    "svix-signature": headers["svix-signature"],
  };

  const wh = new Webhook(clerkSecret);
  let evt;

  try {
    evt = wh.verify(JSON.stringify(payload), heads);
  } catch (error) {
    return res.status(400).json({ error: "verification failed" });
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const updateResult = await User.updateOne(
      { id: evt.data.id },
      evt.data,
      { upsert: true }
    );
    console.log("Update result:", updateResult);
  } else if (evt.type === "user.deleted") {
    const { id } = evt.data;
    const deleteResult = await User.deleteOne({ id: evt.data.id });
    console.log("Delete result:", deleteResult);
  }

  res.status(200).json({ success: true });
};
