import { plaidClient, sessionOptions } from "../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../lib/mongoose";
import User from "../../lib/models/user.model";

export default withIronSessionApiRoute(creditCardHandler, sessionOptions);

async function creditCardHandler(req, res) {
  await connectToDB();
  try {
    const userID = req?.body?.userID;
    const loggedInUser = await User.findOne({ id: userID });
    // const justAddedCreditCard = await User.findOne({ id: userID })
    
    // return res.status(200).json(justAddedCreditCard)
    
    if (!loggedInUser) {
      return res.status(404).send({ error: "User not logged in" });
    }

    if (loggedInUser?.items && loggedInUser?.items.length > 0) {
      const justAddedItem = loggedInUser?.items[loggedInUser?.items.length - 1];
      const accessToken = justAddedItem.accessToken;
      if (!accessToken) {
        return res.status(400).send({ error: "no access token" });
      }

      await addCreditCardsToDb(loggedInUser, accessToken);
      // const updatedUser = await User.findOne({ id: userID });
      // const justAddedCreditCard = updatedUser?.items?.[updatedUser.items.length - 1]?.creditCards;
      // return res.status(200).json(justAddedCreditCard);
      return res.status(200)
      
    } else {
      return res.status(400).send("User has no items");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

async function addCreditCardsToDb(loggedInUser, accessToken, res) {
  try {
    const creditCardAccounts = await plaidClient.liabilitiesGet({
      access_token: accessToken,
    });

    const newCreditCard = creditCardAccounts.data.accounts.map(
      (creditCardAccount) => ({
        name: creditCardAccount.official_name,
        number: creditCardAccount.account_id,
        currentBalance: creditCardAccount.balances.current,
        creditLimit: creditCardAccount.balances.limit,
      })
    );

    const justAddedItem = loggedInUser.items[loggedInUser.items.length - 1];
    if (!justAddedItem.creditCards) {
      justAddedItem.creditCards = [];
    }

    await User.updateOne(
      { id: loggedInUser.id, "items.accessToken": accessToken },
      { $push: { "items.$.creditCards": { $each: newCreditCard } } }
    );
    console.log("Just added credit card:", newCreditCard);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
