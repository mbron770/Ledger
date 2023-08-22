import { withIronSessionApiRoute } from "iron-session/next";
import { plaidClient, sessionOptions } from "../../lib/plaid";
import { connectToDB } from "../../lib/mongoose";
import User from "../../lib/models/user.model";

export default withIronSessionApiRoute(exchangePublicToken, sessionOptions);

async function exchangePublicToken(req, res) {
  const userID = req?.body?.userID;
  const loggedInUser = await confirmLogin(userID);
  if (loggedInUser) {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req?.body?.public_token,
    });

    const accessToken = exchangeResponse?.data?.access_token;
    console.log("accessToken: ", accessToken);

    if (accessToken) {
      await connectToDB();
      try {
        let newItem = {
          accessToken,
        };
        if (!loggedInUser) throw new Error("user not found");
        loggedInUser.items.push(newItem);
        await loggedInUser.save();
        console.log("item inserted");
      } catch (error) {
        console.error(error, "couldnt insert item for user");
        throw new Error("couldnt insert item for user");
      }
    } else {
      throw new Error("no access token");
    }
    res.send({ ok: true });
    return accessToken;
  }
}

async function confirmLogin(userID) {
  const loggedInUser = await User.findOne({ id: userID });
  if (!loggedInUser) throw new Error("not logged in");
  return loggedInUser;
}
