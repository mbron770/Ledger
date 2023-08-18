import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from 'iron-session/next'



export async function handler(req, res) {
  const access_token = req.session.access_token;
  if (req.method === "GET") {
    if (!access_token) {
      return res.status(403).json({ error: "No access Token" }); 
    }

    try {
      const balanceResponse = await plaidClient.accountsBalanceGet({
        access_token
      });

      const balance = balanceResponse.data.accounts.map(account => ({
        official_name: account.official_name, 
        available_balance: account.balances.available 
        
      }))

      return res.status(200).json(balance);
    } catch (error) {
      return res.status(500).json({ error: "error, balance not found" });
    }
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)


