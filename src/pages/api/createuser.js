
import { connectToDB } from "../../lib/mongoose";
import User from '../../lib/models/user.model'

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  connectToDB


  const { id, username, name, image, bio, onboarded } = req.body;

  try {

    const newUser = await User.findOneAndUpdate({
      id,
      username,
      name,
      image,
      bio,
      onboarded,
      upsert: true
    });

    


    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
};