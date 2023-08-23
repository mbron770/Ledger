import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  savingsAccountTransactionsHandler,
  sessionOptions
);

async function savingsAccountTransactionsHandler(req, res) {
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
      await addSavingsAccountTransactionsToDb(loggedInUser, accessToken, res);
      return res.status(200).send("successful");
    } else {
      return res.status(400).send("User has no items");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

async function addSavingsAccountTransactionsToDb(
  loggedInUser,
  accessToken,
  res
) {
  try {
    let cursor = null;
    let added = [];
    let modified = [];
    let removed = [];
    let hasMore = true;

    const lastItemIndex = loggedInUser.items.length - 1;
    const lastSavingsAccountIndex =
      loggedInUser.items[lastItemIndex].savingsAccounts.length - 1;

    // while (hasMore) {
      const request = {
        access_token: accessToken,
        cursor: cursor,
        options: { include_personal_finance_category: true },
        count: 100,
      };
      const transactions = await plaidClient.transactionsSync(request);
      const data = transactions.data;
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);

      hasMore = data.has_more;
      cursor = data.next_cursor;
      

      const newTransactions = data.added.map((transaction) => ({
        date: transaction.date,
        name: transaction.name,
        category: (transaction.category && Array.isArray(transaction.category)) ? transaction.category[0] : 'default', 
        paymentChannel: transaction.payment_channel,
        amount: transaction.amount,
        pending: transaction.pending,
      }));

      

      await User.updateOne(
        { id: loggedInUser.id },
        {
          $push: {
            [`items.${lastItemIndex}.savingsAccounts.${lastSavingsAccountIndex}.transactions`]:
              {
                $each: newTransactions,
              },
          },
        }
      );
      console.log("savings account transactions inserted");
    // }
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
