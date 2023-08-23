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

    




    const investmentAccounts = await plaidClient.investmentsHoldingsGet({
      access_token: accessToken,
    });
  
    

    const iAccounts = investmentAccounts.data.accounts;
    const iHoldings = investmentAccounts.data.holdings;
    const iSecurities = investmentAccounts.data.securities;

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
    

    

    const newInvestmentAccounts = iAccounts.map((iAccount) => ({
      name: iAccount.name,
      accountNumber: `${iAccount.account_id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      balance: iAccount.balances.current,
      securities: newSecurities,
      holdings: newHoldings(iAccount.account_id)

    }));
    console.log([])



  

    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem.investmentAccounts) {
      justAddedItem.investmentAccounts = [];
    }

    const updateResult = await User.updateMany(
      { id: loggedInUser.id, "items.accessToken": accessToken },
      {
        $push: {
          "items.$.investmentAccounts": { $each: newInvestmentAccounts },
        },
      }
    );

    console.log(updateResult)

    

    return res.status(200).json(newInvestmentAccounts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
