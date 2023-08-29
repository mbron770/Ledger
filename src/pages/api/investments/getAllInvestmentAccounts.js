import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAllInvestmentAccountsHandler,
  sessionOptions
);

async function getAllInvestmentAccountsHandler(req, res) {
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

    let allInvestmentAccounts = [];

    loggedInUser.items.forEach((item) => {
      if (item.investmentAccounts && item.investmentAccounts.length > 0) {
        const transformedInvestmentAccounts = item.investmentAccounts.map(
          (investment) => ({
            dateAdded: investment.dateAdded,
            name: investment.name,
            number: investment.accountNumber,
            currentBalance: investment.balance,
            transactions: investment.transactions,
            holdings: investment.holdings,
            securities: investment.securities,
          })
        );
        
        allInvestmentAccounts = allInvestmentAccounts.concat(
          transformedInvestmentAccounts
        );
      }
    });

    if (allInvestmentAccounts.length > 0) {
      console.log(allInvestmentAccounts);
      return res.status(200).json(allInvestmentAccounts);
    } else {
      return res.status(404).json({ error: "User has no credit investments" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
