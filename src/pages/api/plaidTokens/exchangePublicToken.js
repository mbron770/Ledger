import { withIronSessionApiRoute } from "iron-session/next";
import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(exchangePublicToken, sessionOptions);

async function exchangePublicToken(req, res) {
  await connectToDB();
  const userID = req?.body?.userID;
  const loggedInUser = await confirmLogin(userID);
  if (!loggedInUser) {
    return res.status(403).send({ error: "user not logged in" });
  }

  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req?.body?.public_token,
    });
    

    const accessToken = exchangeResponse?.data?.access_token;
    console.log("accessToken: ", accessToken);

    if (!accessToken) {
      return res.status(400).send({ error: "no access token" });
    }

    let newItem = {
      accessToken,
    };

    loggedInUser.items.push(newItem);
    await loggedInUser.save();
    console.log("item inserted");

    res.send({ ok: true });
    // return accessToken;
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "server error" });
  }
}

async function confirmLogin(userID) {
  await connectToDB();

  try {
    const loggedInUser = await User.findOne({ id: userID });
    return loggedInUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Database error while fetching user");
  }
}
