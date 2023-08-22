import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../lib/mongoose";
import User from "../../lib/models/user.model";

export default withIronSessionApiRoute(
  liabilitiesAccountsAdded,
  sessionOptions
);

async function creditCardHandler(req, res){
  await connectToDB();
  try {
    const userID = req?.body?.userID;
    const loggedInUser = await User.findOne({ id: userID });
    if (loggedInUser?.items && loggedInUser?.items.length > 0) {
      const justAddedItem = loggedInUser?.items[loggedInUser?.items.length - 1];
      const accessToken = justAddedItem.accessToken;
    return accessToken
    }


    await addItemAccountsToDB(loggedInUser, accessToken);
    // await addItemTransactionsToDB(loggedInUser, accessToken, res);
    // awaiaccessToken
access_token
    return res.status(200).json("linked item and pulled all data");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }

}

async function liabilitiesAccountsAdded(req, res) {
  const userID = req?.body?.userID;
  await connectToDB();
  const loggedInUser = await User.findOne({ id: userID });

  try {
    if (loggedInUser?.items && loggedInUser?.items.length > 0) {
      const justAddedItem = loggedInUser?.items[loggedInUser?.items.length - 1];
      const accessToken = justAddedItem.accessToken;

      const creditCardAccounts = await plaidClient.liabilitiesGet({
        access_token: accessToken,
      });

      const newCreditCard = creditCardAccounts.data.accounts.map((creditCardAccount) => ({
        name: creditCardAccount.official_name,
        number: creditCardAccount.account_id,
        currentBalance: creditCardAccount.balances.current,
        creditLimit: creditCardAccount.balances.limit,
        
      }));


    if (loggedInUser.items && loggedInUser.items.length > 0) {
    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem) {
      justAddedItem.creditCards = [];
    }
    justAddedItem.creditCards.push(...newCreditCard);
    await loggedInUser.save();
    console.log("new credit card inserted");
  } else {
    throw new Error("User has no items");
  }


async function getCreditCardTransactions()

      







      
    } else {
      throw new Error("no items");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
}
