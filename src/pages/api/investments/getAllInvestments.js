import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAllInvestmentsHandler,
  sessionOptions
);

async function getAllInvestmentsHandler(req, res) {
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

    let allInvestments = [];

    loggedInUser.items.forEach((item) => {
      if (investmentAccounts && investmentAccounts.length > 0) {
        const transformedInvestmentAccounts = investmentAccounts.map((investmentAccount) => ({
          dateAdded: investmentAccount.dateAdded,
          name: investmentAccount.name,
          number: investmentAccount.accountNumber,
          currentBalance: investmentAccount.balance,
          transactions: investmentAccount.transactions,
          holdings: investmentAccount.holdings,
          securities: investmentAccount.securities

        
        }));

        allInvestments = allInvestments.concat(transformedInvestmentAccounts);
      }
    });

    if (allInvestments.length > 0) {
      console.log(allInvestments);
      return res.status(200).json(allInvestments);
    } else {
      return res.status(404).json({ error: "User has no investmentAccounts" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
