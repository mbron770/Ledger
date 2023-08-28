import { plaidClient, sessionOptions } from "../../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAllCreditCardsHandler,
  sessionOptions
);

async function getAllCreditCardsHandler(req, res) {
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

    let allCreditCards = [];

    loggedInUser.items.forEach((item) => {
      if (item.creditCards && item.creditCards.length > 0) {
        const transformedCreditCards = item.creditCards.map((card) => ({
          dateAdded: card.dateAdded,
          name: card.name,
          number: card.number,
          currentBalance: card.currentBalance,
          creditLimit: card.creditLimit,
          transactions: card.transactions,
        }));

        allCreditCards = allCreditCards.concat(transformedCreditCards);
      }
    });

    if (allCreditCards.length > 0) {
      console.log(allCreditCards);
      return res.status(200).json(allCreditCards);
    } else {
      return res.status(404).json({ error: "User has no credit cards" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}
