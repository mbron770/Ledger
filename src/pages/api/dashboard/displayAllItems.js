import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(displayAllItemsHandler, sessionOptions);

async function displayAllItemsHandler(req, res) {
  await connectToDB();

  const userID = req?.body?.userID;

  if (!userID) {
    return res.status(400).json({ error: "userID is required" });
  }

  try {
    const loggedInUser = await User.findOne({ id: userID });
    if (!loggedInUser) {
      return res.status(404).send({ error: "User not logged in" });
    }

    const allItems = [];
    const sortByDateAdded = (first, last) =>
      new Date(last.dateAdded) - new Date(first.dateAdded);

    if (loggedInUser.items && loggedInUser.items.length > 0) {
      loggedInUser.items.forEach((item) => {
        const itemData = {};

        if (item.creditCards && item.creditCards.length > 0) {
          itemData.creditCards = item.creditCards
            .map((card) => ({
              dateAdded: card.dateAdded,
              name: card.name,
              number: card.number,
              currentBalance: card.currentBalance,
              creditLimit: card.creditLimit,
            }))
            .sort(sortByDateAdded);
        }

        if (item.checkingAccounts && item.checkingAccounts.length > 0) {
          itemData.checkingAccounts = item.checkingAccounts
            .map((account) => ({
              dateAdded: account.dateAdded,
              name: account.name,
              accountNumber: account.accountNumber,
              balance: account.balance,
            }))
            .sort(sortByDateAdded);
        }

        if (item.savingsAccounts && item.savingsAccounts.length > 0) {
          itemData.savingsAccounts = item.savingsAccounts
            .map((account) => ({
              dateAdded: account.dateAdded,
              name: account.name,
              accountNumber: account.accountNumber,
              balance: account.balance,
            }))
            .sort(sortByDateAdded);
        }

        if (item.investmentAccounts && item.investmentAccounts.length > 0) {
          itemData.investmentAccounts = item.investmentAccounts
            .map((account) => ({
              dateAdded: account.dateAdded,
              name: account.name,
              accountNumber: account.accountNumber,
              balance: account.currentBalance,
            }))
            .sort(sortByDateAdded);
        }

        if (item.loans && item.loans.length > 0) {
          itemData.loans = item.loans
            .map((loan) => ({
              dateAdded: loan.dateAdded,
              name: loan.name,
              accountNumber: loan.accountNumber,
              balance: loan.currentBalance,
            }))
            .sort(sortByDateAdded);
        }

        allItems.push(itemData);
      });

      if (allItems.length > 0) {
        console.log(allItems);
        return res.status(200).json(allItems);
      } else {
        return res.status(404).json({ error: "User has no items" });
      }
    } else {
      return res.status(404).json({ error: "User has no items associated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
