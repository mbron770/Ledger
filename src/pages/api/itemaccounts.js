import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../lib/mongoose";
import Item from '../../lib/models/item.model'
import User from '../../lib/models/user.model'
import Account from "../../lib/models/account.model"

export async function handler(req, res) {
  // const access_token = req.session.access_token;
  if (req.method === "GET") {

    await connectToDB 

    const access_token = await Item.findOne()

    if (!access_token) {
      return res.status(403).json({ error: "No access Token" });
    }

    try {
      const itemAccounts = await plaidClient.accountsGet({
        access_token,
      });
      const accounts = itemAccounts.data.accounts.map((account) => ({
        official_name: account.official_name,
        account_id: account.account_id,
        subtype: account.subtype,
        available_balance: account.balances.available,
      }));

      await Account.insertMany(accounts).save()

      return res.status(200).json(accounts);
    } catch (error) {
      return res.status(500).json({ error: "error, balance not found" });
    }
  }
}

export default handler 

// export default withIronSessionApiRoute(handler, sessionOptions);
