import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../lib/mongoose";
import Item from "../../lib/models/item.model";
import User from "../../lib/models/user.model";
import Account from "../../lib/models/account.model";
import Transaction from "../../lib/models/transactions.model";

async function handler(req, res) {
  // if (req.method !== "GET") {
  //   return res.status(405).json({ error: "Method not allowed" });
  // }
  //   const access_token = req.session.access_token;

//   await connectToDB();

  // const userId = req.query.userId;
  // const id = '1'
  // const item = await Item.findOne({user: id});

//   const newestAccessToken = await User.items.findOne().sort({ _id: -1 }).limit(1);
//   const access_token = newestAccessToken.access_token;
//   if (!access_token) {
//     return res.status(403).json({ error: "No access Token" });
//   }

const userID = req.body.userID;
await connectToDB();
const currentUser = await User.findOne({ id: userID });


  try {
    // const authResponse = await plaidClient.authGet({ ac });
    if (currentUser?.items && currentUser?.items.length > 0){
      const justAddedItem = currentUser?.items[currentUser?.items.length - 1]
      const at = justAddedItem.access_token

    let cursor = null;
    let added = [];
    let modified = [];
    let removed = [];
    let hasMore = true;

    const response = await plaidClient.transactionsSync({
      access_token: at,
      count: 500,
    });
    // console.log('response - ', response.data)

    added = added.concat(response.data.added);
    modified = modified.concat(response.data.modified);
    removed = removed.concat(response.data.removed);
    hasMore = response.data.has_more;
    cursor = response.data.next_cursor;
    const recentlyAdded = [...added].sort().slice(-1000);
    // console.log('recentlyAdded - ', recentlyAdded);

    // const byDate = (a, b) => (a.date > b.date) - (a.date > b.date)
    const transactions = recentlyAdded.map((ra) => ({
      date: ra.date,
      name: ra.name,
      category: ra.category[0],
      amount: ra.amount,
    }));

    // await Transaction.insertMany(transactions);

    return res.status(200).json(transactions);



    }
    
  } catch (error) {
    console.error(error)
    // while (hasMore) {
    //   const request = {
    //     // access_token: item.access_token,
    //     access_token: access_token,
    //     cursor: cursor,
    //   };

    //   const response = await plaidClient.transactionsSync(request);
    //   const data = response.data;
    //   console.log(data)

    //   added = added.concat(data.added);
    //   modified = modified.concat(data.modified);
    //   removed = removed.concat(data.removed);
    //   hasMore = data.has_more;
    //   cursor = data.next_cursor;
    // }

    // const byDate = (a, b) => (a.date > b.date) - (a.date > b.date)

    // const recentlyAdded = [...added].sort().slice(-1000);
    // console.log(recentlyAdded);

    // const transactions = recentlyAdded.map((ra) => ({
    //   date: ra.date,
    //   name: ra.name,
    //   category: ra.category[0],
    //   amount: ra.amount,
    // }));

    // await Account.insertMany(transactions).save()

    // return res.status(200).json(transactions);
    // return res.status(200).json(response.data);

    console.log("error");
    return res.status(500).json({ error: "server error" });
  }
}

// export default handler

export default withIronSessionApiRoute(handler, sessionOptions);
