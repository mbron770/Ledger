import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../lib/mongoose";
import Item from '../../lib/models/item.model'
import User from '../../lib/models/user.model'
import Account from "../../lib/models/account.model"


async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
//   const access_token = req.session.access_token;

await connectToDB 
const access_token = await Item.findOne()

  if (!access_token) {
    return res.status(403).json({ error: "No access Token" });
  }

  try {
    const authResponse = await plaidClient.authGet({ access_token });
    let cursor = null;
    let added = [];
    let modified = [];
    let removed = [];
    let hasMore = true;

    while (hasMore) {
      const request = {
        access_token: access_token,
        cursor: cursor,
      };

      const response = await plaidClient.transactionsSync(request);
      const data = response.data;

      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      cursor = data.next_cursor;
    }

    // const byDate = (a, b) => (a.date > b.date) - (a.date > b.date)

    const recentlyAdded = [...added].sort().slice(-1000);
    console.log(recentlyAdded);

    const transactions = recentlyAdded.map((ra) => ({
      date: ra.date,
      name: ra.name,
      category: ra.category[0],
      amount: ra.amount,
    }));

    await Account.insertMany(transactions).save()

    return res.status(200).json(transactions);
  } catch (error) {
    alert("error fetching transactions");
    return res.status(500).json({ error: "server error" });
  }
}

export default handler

// export default withIronSessionApiRoute(handler, sessionOptions);
