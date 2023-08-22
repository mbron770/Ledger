import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  displayCheckingAccountTransactionsHandler,
  sessionOptions
);

async function displayCheckingAccountTransactionsHandler(req, res) {
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
      const lastItem = loggedInUser.items[loggedInUser.items.length - 1];
      if (lastItem.checkingAccounts && lastItem.checkingAccounts.length > 0) {
        const justAddedCheckingAccount =
          lastItem.checkingAccounts[lastItem.checkingAccounts.length - 1];
        const justAddedTransactions = justAddedCheckingAccount.transactions;
        return res.status(200).json(justAddedTransactions);
      }
    }
    return res.status(404).json({ error: "User has no credit cards" });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
