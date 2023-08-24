import { plaidClient } from "../../../lib/plaid";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default async function handler(req, res) {
  const products = req?.body?.products;
  const account_filters = req?.body?.account_filters;
  const userID = req?.body?.user?.id;

  try {
    const tokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: process.env.PLAID_CLIENT_ID },
      client_name: "Spent",
      language: "en",
      products,
      income_verification: {
        income_source_types: ["payroll"],
      },
      user_token: await createUser(userID),
      // user_token: "user-sandbox-c27d98a8-f149-4998-bc7f-a6b57ba9f115",
      country_codes: ["US"],
      // account_filters,
    });

    return res.json(tokenResponse.data);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}

async function createUser(userID) {
  await connectToDB();
  console.log("create user");
  const loggedInUser = await User.findOne({ id: userID });

  try {
    const request = {
      client_user_id: `${userID}-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`,
    };

    const response = await plaidClient.userCreate(request);
    const jobID = response?.data?.user_token;

    let newJobID = {
      jobID,
    };
    loggedInUser.jobs.push(newJobID);
    await loggedInUser.save();
    console.log("jobID inserted");
    return jobID;
  } catch (error) {
    console.error(error);
    throw new Error("error creating user");
  }
}
