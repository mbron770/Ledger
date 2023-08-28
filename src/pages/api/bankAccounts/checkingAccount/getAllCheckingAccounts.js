import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAllCheckingAccountsHandler,
  sessionOptions
);

async function getAllCheckingAccountsHandler(req, res) {
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

    let allCheckingAccounts = [];

    loggedInUser.items.forEach((item) => {
      if (item.checkingAccounts && item.checkingAccounts.length > 0) {
        const transformedCheckingAccounts = item.checkingAccounts.map(
          (account) => ({
            dateAdded: account.dateAdded,
            name: account.name,
            number: account.accountNumber,
            currentBalance: account.balance,
            transactions: account.transactions,
          })
        );

        allCheckingAccounts = allCheckingAccounts.concat(
          transformedCheckingAccounts
        );
      }
    });

    if (allCheckingAccounts.length > 0) {
      console.log(allCheckingAccounts);
      return res.status(200).json(allCheckingAccounts);
    } else {
      return res.status(404).json({ error: "User has no checking accounts" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
