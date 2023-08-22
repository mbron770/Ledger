import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  displayCreditCardTransactionsHandler,
  sessionOptions
);

async function displayCreditCardTransactionsHandler(req, res) {
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
      if (lastItem.creditCards && lastItem.creditCards.length > 0) {
        const justAddedCreditCard =
          lastItem.creditCards[lastItem.creditCards.length - 1];
        const justAddedTransactions = justAddedCreditCard.transactions;
        return res.status(200).json(justAddedTransactions);
      }
    }
    return res.status(404).json({ error: "User has no credit cards" });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
