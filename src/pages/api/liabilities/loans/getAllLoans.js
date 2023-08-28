import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(getAllLoansHandler, sessionOptions);

async function getAllLoansHandler(req, res) {
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

    let allLoans = [];

    loggedInUser.items.forEach((item) => {
      if (item.loans && item.loans.length > 0) {
        const transformedLoans = item.loans.map((loan) => ({
          dateAdded: loan.dateAdded,
          name: loan.name,
          number: loan.accountNumber,
          currentBalance: loan.currentBalance,
        }));

        allLoans = allLoans.concat(transformedLoans);
      }
    });

    if (allLoans.length > 0) {
      console.log(allLoans);
      return res.status(200).json(allLoans);
    } else {
      return res.status(404).json({ error: "User has no loans" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
