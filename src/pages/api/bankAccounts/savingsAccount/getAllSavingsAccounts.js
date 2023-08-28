import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAllSavingsAccountsHandler,
  sessionOptions
);

async function getAllSavingsAccountsHandler(req, res) {
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

    let allSavingsAccounts = [];

    loggedInUser.items.forEach((item) => {
      if (item.savingsAccounts && item.savingsAccounts.length > 0) {
        const transformedSavingsAccounts = item.savingsAccounts.map(
          (account) => ({
            dateAdded: account.dateAdded,
            name: account.name,
            number: account.accountNumber,
            currentBalance: account.balance,
            transactions: account.transactions,
          })
        );

        allSavingsAccounts = allSavingsAccounts.concat(
          transformedSavingsAccounts
        );
      }
    });

    if (allSavingsAccounts.length > 0) {
      console.log(allSavingsAccounts);
      return res.status(200).json(allSavingsAccounts);
    } else {
      return res.status(404).json({ error: "User has no Savings accounts" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
