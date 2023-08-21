import { withIronSessionApiRoute } from "iron-session/next";
import { plaidClient, sessionOptions } from "../../lib/plaid";
import { connectToDB } from "../../lib/mongoose";
import User from "../../lib/models/user.model";

export default withIronSessionApiRoute(loader, sessionOptions);

async function loader(req, res) {
  await connectToDB();
  try {
    const userID = req?.body?.userID;
    const loggedInUser = await confirmLogin(userID);

    const publicToken = req?.body?.public_token;
    const accessToken = await exchangePublicAccessToken(publicToken, loggedInUser);

    await addItemAccountsToDB(loggedInUser, accessToken);
    // await addItemTransactionsToDB(loggedInUser, accessToken, res);
    await investmentAccounts(accessToken, loggedInUser, res)

    return res.status(200).json("linked item and pulled all data");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
}

async function confirmLogin(userID) {
  const loggedInUser = await User.findOne({ id: userID });
  if (!loggedInUser) throw new Error("not logged in");
  return loggedInUser;
}

async function exchangePublicAccessToken(publicToken, loggedInUser) {
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken,
  });
  const accessToken = exchangeResponse?.data?.access_token;
  
  if (!accessToken) throw new Error("no access token");

  try {
    let newItem = {
      accessToken,
    };
    if (!loggedInUser) throw new Error("user not found");
    loggedInUser.items.push(newItem);
    await loggedInUser.save();
  } catch (error) {
    console.error(error, "couldnt insert item for user");
    throw new Error("couldnt insert item for user");
  }

  return accessToken;
}

async function addItemAccountsToDB(loggedInUser, accessToken) {
  const itemAccounts = await plaidClient.accountsGet({
    access_token: accessToken,
  });

  const accounts = itemAccounts.data.accounts.map((account) => ({
    name: account.official_name,
    accountNumber: account.account_id,
    type: account.subtype,
    balance: account.balances.available,
  }));

  if (loggedInUser.items && loggedInUser.items.length > 0) {
    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem) {
      justAddedItem.accounts = [];
    }
    justAddedItem.accounts.push(...accounts);
    await loggedInUser.save();
    console.log("accounts inserted");
  } else {
    throw new Error("User has no items");
  }
}

// async function addItemTransactionsToDB(loggedInUser, accessToken, res){
//   let cursor = null;
//   let added = [];
//   let modified = [];
//   let removed = [];
//   let hasMore = true;

//   const request = {
//     access_token: accessToken,
//     count: 100, 
//     cursor: cursor
//   }

//   try{
//     // let cursor = null;
//     // let added = [];
//     // let modified = [];
//     // let removed = [];
//     // let hasMore = true;

//     // accessToken = loggedInUser.items[loggedInUser.items.length-1]?.accessToken
//     while (hasMore){
//       const response = await plaidClient.transactionsSync(request/*{
//         access_token: accessToken, 
//         count: 100,
//         cursor: cursor
//       }*/)


//       if(response.data){
//         added = added.concat(response.data.added);
//         modified = modified.concat(response.data.modified);
//         removed = removed.concat(response.data.removed);
//         hasMore = response.data.has_more;
//         cursor = response.data.next_cursor;

//       }else{
//         throw new Error('no transactions')
//       }
//       const recentlyAdded = added.slice(-1000)

//       const transactions = recentlyAdded.map((ra) => ({
//         date: ra.date,
//         name: ra.name,
//         category: ra.category[0],
//         amount: ra.amount,
//       }));
     
//      console.log(transactions);
//      if(loggedInUser.items && loggedInUser.items.length > 0){
//       const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1]
//       if(!justAddedItem){
//         justAddedItem.transactions = []
//       }
//       justAddedItem.transactions.push(...transactions)
//       await loggedInUser.save()
//       console.log('transactions inserted')
    
    
//     } else {
//       throw new Error('User has no items')
//     }



//     }


//   }catch(error){
//     console.error(error.message)
//     return res.status(500).json({ error: 'server error' })
//   }
// }


async function investmentAccounts(accessToken, loggedInUser, res){
  // accessToken = 'access-sandbox-68ecfc88-1aaf-4764-8d0a-f337e334089e'

  // const request = {
  //   access_token: accessToken,
  // }

  try {
    const response = await plaidClient.investmentsHoldingsGet({
      access_token: accessToken
    });
    // const holdings = response.data.holdings;
    // const securities = response.data.securities;
    console.log(response.data)
    return response.data
    // return res.status(200).json(response.data);
    
  } catch (error) {
    console.error(error.message)
    throw new Error("Failed to get investment accounts");
    // return res.status(500).json({ error: 'server error' })
  }

  


}


  // setTimeout(async () => {
  //     try{
  //   let cursor = null;
  //   let added = [];
  //   let modified = [];
  //   let removed = [];
  //   let hasMore = true;

  //   while (hasMore){
  //     const response = await plaidClient.transactionsSync({
  //       access_token: accessToken.secret, 
  //       count: 10,
  //       cursor: cursor
  //     })


  //     if(response.data){
  //       added = added.concat(response.data.added);
  //       modified = modified.concat(response.data.modified);
  //       removed = removed.concat(response.data.removed);
  //       hasMore = response.data.has_more;
  //       cursor = response.data.next_cursor;

  //     }else{
  //       throw new Error('no transactions')
  //     }



  //     const recentlyAdded = added.slice(-1000)
  //     console.log(recentlyAdded)
  //   }


  // }catch(error){
  //   console.error(error.message)
  //   return res.status(500).json({ error: 'server error' })
  // }
  // }, 20000)


