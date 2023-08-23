import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(loanHandler, sessionOptions);

async function loanHandler(req, res) {
  await connectToDB();
  try {
    const userID = req?.body?.userID;
    const loggedInUser = await User.findOne({ id: userID });
    
    if (!loggedInUser) {
      return res.status(404).send({ error: "User not logged in" });
    }

    if (loggedInUser?.items && loggedInUser?.items.length > 0) {
      const justAddedItem = loggedInUser?.items[loggedInUser?.items.length - 1];
      const accessToken = justAddedItem.accessToken;
      if (!accessToken) {
        return res.status(400).send({ error: "no access token" });
      }

      await addLoansToDb(loggedInUser, accessToken, res);
      return res.status(200)
      
    } else {
      return res.status(400).send("User has no items");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

async function addLoansToDb(loggedInUser, accessToken, res) {
  try {
    const loans = await plaidClient.liabilitiesGet({
      access_token: accessToken,
    });
    
    const newLoan = loans.data.accounts.map((loan) => ({
      name: loan.name,
      accountNumber: loan.account_id, 
      balances: loan.balances.current,
    }))


  

    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem.loans) {
      justAddedItem.loans = [];
    }

    await User.updateMany(
      { id: loggedInUser.id, "items.accessToken": accessToken },
      { $push: { "items.$.loans": { $each: newLoan } } }
    );
    console.log("Just added loan:", newLoan);
    return res.status(200).json(newLoan)
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
