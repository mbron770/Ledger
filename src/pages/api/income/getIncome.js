import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAddedCreditCardHandler,
  sessionOptions
);

async function getAddedCreditCardHandler(req, res) {
  await connectToDB();
  const userID = req?.body?.userID;

  if (!userID) {
    return res.status(400).json({ error: "userID is required" });
  }

  try {
    const loggedInUser = await User.findOne({ id: userID });
    if (!loggedInUser) {
      return res.status(404).send({ error: "User not logged in" });
    }

    if (loggedInUser.items && loggedInUser.items.length > 0) {
      const justAddedCreditCard =
        loggedInUser.items[loggedInUser.items.length - 1]?.creditCards;

      return res.status(200).json(justAddedCreditCard);
    } else {
      return res.status(404).json({ error: "User has no credit cards" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
