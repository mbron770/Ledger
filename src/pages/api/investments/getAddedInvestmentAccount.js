import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAddedSavingsAccountHandler,
  sessionOptions
);

async function getAddedSavingsAccountHandler(req, res) {
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
      const justAddedSavingsAccount =
        loggedInUser.items[loggedInUser.items.length - 1]?.savingsAccounts;

      return res.status(200).json(justAddedSavingsAccount);
    } else {
      return res.status(404).json({ error: "User has no Savings accounts" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
