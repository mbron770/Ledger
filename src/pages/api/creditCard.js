import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../lib/mongoose";
import User from "../../lib/models/user.model";

export default withIronSessionApiRoute(creditCardHandler, sessionOptions);

async function creditCardHandler(req, res) {
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

      await addCreditCardsToDb(loggedInUser, accessToken);
      await addCreditCardTransactionsToDb(loggedInUser, accessToken)
      return res.status(200).send("successful");
    } else {
      return res.status(400).send("User has no items");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

async function addCreditCardsToDb(loggedInUser, accessToken, res) {
  try {
    const creditCardAccounts = await plaidClient.liabilitiesGet({
      access_token: accessToken,
    });

    const newCreditCard = creditCardAccounts.data.accounts.map(
      (creditCardAccount) => ({
        name: creditCardAccount.official_name,
        number: creditCardAccount.account_id,
        currentBalance: creditCardAccount.balances.current,
        creditLimit: creditCardAccount.balances.limit,
      })
    );

    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem.creditCards) {
      justAddedItem.creditCards = [];
    }

    justAddedItem.creditCards.push(...newCreditCard);
    await loggedInUser.save();
    console.log("credit card added");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}


async function addCreditCardTransactionsToDb(loggedInUser, accessToken, res){
  try{

    let cursor = null;
    let added = [];
    let modified = [];
    let removed = [];
    let hasMore = true;

    while(hasMore){
      const request = {
        access_token: accessToken, 
        cursor: cursor, 
        options: {include_personal_finance_category: true},
        count: 100

      }
      const transactions = await plaidClient.transactionsSync(request)
      const data = transactions.data
      added = added.concat(data.added)
      modified = modified.concat(data.modified)
      removed = removed.concat(data.removed)

      hasMore = data.has_more
      cursor = data.next_cursor

      const newTransactions = transactions.map((transaction) => ({
        date: transaction.date,
        name: transaction.name,
        category: transaction.category[0],
        paymentChannel: transaction.payment_channel,
        amount: transaction.amount,
        pending: transaction.pending
      }))
    }
    



  }catch(error){
    console.error(error);
    return res.status(500).send("server error");
  }
}
