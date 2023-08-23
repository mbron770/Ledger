import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(
  investmentAccountHandler,
  sessionOptions
);

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

      return res.status(200);
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

    const iAccounts = investmentAccount.data.accounts;
    const iHoldings = investmentAccount.data.holdings;
    const iSecurities = investmentAccount.data.securities;

    const newHoldings = (accountId) =>
      iHoldings
        .filter((iHolding) => iHolding.account_id === accountId)
        .map((iHolding) => ({
          account_id: iHolding.account_id,
          cost_basis: iHolding.cost_basis,
          institution_price: iHolding.institution_price,
          institution_value: iHolding.institution_value,
          quantity: iHolding.quantity,
        }));

    const newSecurities = iSecurities.map((iSecurity) => ({
      close_price: iSecurity.close_price,
      name: iSecurity.name,
      type: iSecurity.type,
      ticker_symbol: iSecurity.ticker_symbol,
    }));

    const newInvestmentAccount = iAccounts.map((iAccount) => ({
      name: iAccount.name,
      accountNumber: iAccount.account_id,
      balance: iAccount.balances.current,
      holdings: newHoldings(iAccount.account_id),
      securities: newSecurities,
    }));

    //add to db here

    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem.investmentAccounts) {
      justAddedItem.investmentAccounts = [];
    }

    const updateResult = await User.updateOne(
      { id: loggedInUser.id, "items.accessToken": accessToken },
      {
        $push: {
          "items.$.investmentAccounts": { $each: newInvestmentAccount },
        },
      }
    );
    console.log("Just added investment account:", updateResult);

    // const options = {

    //   count: 10,
    //   account_ids: ['74JDa8w3ZpClpWZEwreJFGdqjgpeZ7S8RPRBo']
    // }

    // const request ={
    //   access_token: 'access-sandbox-b81cb7a5-ba6e-4c8d-839b-67609254f45d',
    //   start_date: '2022-09-01',
    //   end_date: '2023-08-10',
    //   options

    // };

    //   const response = await plaidClient.investmentsTransactionsGet(request)
    //   console.log(response.data.investment_transactions)

    return res.status(200).json(newInvestmentAccount);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
