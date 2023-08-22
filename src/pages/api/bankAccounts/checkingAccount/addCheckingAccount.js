import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(checkingAccountHandler, sessionOptions);

async function checkingAccountHandler(req, res) {
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

      await addCheckingAccountsToDb(loggedInUser, accessToken, res);
     
      return res.status(200)
      
    } else {
      return res.status(400).send("User has no items");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

async function addCheckingAccountsToDb(loggedInUser, accessToken, res) {
  try {
    const checkingAccount = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const newCheckingAccount = checkingAccount.data.accounts.map(
      (account) => ({
        name: account.official_name,
        accountNumber: account.account_id,
        balance: account.balances.available,
      })
    );

    console.log(newCheckingAccount)

    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem.checkingAccounts) {
      justAddedItem.checkingAccounts = [];
    }

    await User.updateOne(
      { id: loggedInUser.id, "items.accessToken": accessToken },
      { $push: { "items.$.checkingAccounts": { $each: newCheckingAccount } } }
    );
    console.log("Just added credit card:", newCheckingAccount);
    return res.status(200).json(newCheckingAccount)
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
