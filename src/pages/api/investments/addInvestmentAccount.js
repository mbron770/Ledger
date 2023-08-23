import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(investmentAccountHandler, sessionOptions);

async function investmentAccountHandler(req, res) {
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

      await addInvestmentAccountsToDb(loggedInUser, accessToken, res);
     
      return res.status(200)
      
    } else {
      return res.status(400).send("User has no items");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

async function addInvestmentAccountsToDb(loggedInUser, accessToken, res) {
  try {
    const investmentAccount = await plaidClient.investmentsHoldingsGet({
      access_token: accessToken,
     
    });

  
    const iAccounts = investmentAccount.data.accounts
    const holdings = investmentAccount.data.holdings;
    const securities = investmentAccount.data.securities;

    const newInvestmentAccount = iAccounts.map(
      (iAccount) => ({
        name: iAccount.name,
        accountNumber: iAccount.account_id,
        balance: iAccount.balances.current,
      })
    )

    console.log(newInvestmentAccount)

    // const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    // if (!justAddedItem.investmentAccounts) {
    //   justAddedItem.investmentAccounts = [];
    // }

    // await User.updateOne(
    //   { id: loggedInUser.id, "items.accessToken": accessToken },
    //   { $push: { "items.$.investmentAccounts": { $each: newInvestmentAccount } } }
    // );
    // console.log("Just added investment account:", newInvestmentAccount);
    return res.status(200).json(newInvestmentAccount) //change this to map version
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
