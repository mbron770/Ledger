import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(
  investmentTransactionsHandler,
  sessionOptions
);

async function investmentTransactionsHandler(req, res) {
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
      await addInvestmentTransactionsToDb(loggedInUser, accessToken, res);
      return res.status(200).send("successful");
    } else {
      return res.status(400).send("User has no items");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

async function addInvestmentTransactionsToDb(loggedInUser, accessToken, res) {
  try {
   

    const lastItemIndex = loggedInUser.items.length - 1;
    const lastInvestmentIndex =
      loggedInUser.items[lastItemIndex].investmentAccounts.length - 1;

      const options = {

  count: 100,
}

const request ={
  access_token: accessToken,
  start_date: '2022-09-01',
  end_date: '2023-08-10',
  options}

  const investmentTransactions = await plaidClient.investmentsTransactionsGet(request)
  

  

  const iTransactions = investmentTransactions.data.investment_transactions.map((iTransaction) => ({
    date: iTransaction.date,
    name: iTransaction.name, 
    amount: iTransaction.amount, 
    fees: iTransaction.fees, 
    price: iTransaction.price, 
    quantity: iTransaction.quantity, 
    type: iTransaction.type
  }))

      await User.updateMany(
        { id: loggedInUser.id },
        {
          $push: {
            [`items.${lastItemIndex}.investmentAccounts.${lastInvestmentIndex}.transactions`]:
              {
                $each: iTransactions,
              },
          },
        }
      );
    
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
