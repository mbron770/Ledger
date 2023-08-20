import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../lib/mongoose";
import Item from '../../lib/models/item.model'
import User from '../../lib/models/user.model'
import Account from "../../lib/models/account.model"

export async function handler(req, res) {
  // const access_token = req.session.access_token;
  if (req.method === "GET") {

    await connectToDB();

    // const access_token = await Item.findOne()
    const newestAccessToken = await Item.accessToken.findOne().sort({ _id: -1 }).limit(1)
    const access_token = newestAccessToken
    console.log(newestAccessToken)

    const userID = req.body?.UserID 
    const loggedInUser = await Item.findOne({user: userID})
    if(!loggedInUser){
      return ('user not found')
    }

    

    if (!access_token) {
      return res.status(403).json({ error: "No access Token" });
    }

    try {
      const itemAccounts = await plaidClient.accountsGet({
        access_token
      });

      console.log(itemAccounts.data)
      const accounts = itemAccounts.data.accounts.map((account) => ({
        name: account.official_name,
        accountNumber: account.account_id,
        type: account.subtype,
        balance: account.balances.available,
      }));

      await Account.insertMany(accounts)

      return res.status(200).json(accounts);
    } catch (error) {
      return res.status(500).json({ error: "error, balance not found" });
    }
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
