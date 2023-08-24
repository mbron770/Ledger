import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(getAddedLoanCardHandler, sessionOptions);

async function getAddedLoanCardHandler(req, res) {
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
      const justAddedLoan =
        loggedInUser.items[loggedInUser.items.length - 1]?.loans;

      return res.status(200).json(justAddedLoan);
    } else {
      return res.status(404).json({ error: "User has no Loans" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
