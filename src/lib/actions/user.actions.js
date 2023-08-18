import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";


export async function updateUser({
    userId,
    username,
    name,
    bio,
    image
    // path,
}) {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId }, 
            { username: username.toLowerCase(), name, bio, image, onboarded: true },
            { upsert: true }
        );

        // if (path === "/profile/edit") {
        //     revalidatePath(path);
        // }
    } catch(error) {
        throw new Error(`Failed to create/update user ${error.message}`);
    }
}

