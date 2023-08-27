import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  displayRecentCreditCardTransactionsHandler,
  sessionOptions
);

async function displayRecentCreditCardTransactionsHandler(req, res) {
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

    const recentTransactions = [];

    if (loggedInUser.items && loggedInUser.items.length > 0) {
      loggedInUser.items.forEach((item) => {
        if (item.creditCards && item.creditCards.length > 0) {
          item.creditCards.forEach((card) => {
            if (card.transactions && card.transactions.length > 0) {
              recentTransactions.push(...card.transactions.slice(0,10));
            }
          });
        }
      });

      if (recentTransactions.length > 0) {
        recentTransactions.sort((a, b) => {
          const first = new Date(a.date);
          const last = new Date(b.date);

          return last - first;
        });

        return res.status(200).json(recentTransactions);
      } else {
        return res
          .status(404)
          .json({ error: "User has no recent transactions" });
      }
    } else {
      return res.status(404).json({ error: "User has no items associated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
