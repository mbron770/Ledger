import { plaidClient } from "../../../lib/plaid";

export default async function handler(req, res) {
  const products = req?.body?.products;
  const account_filters = req.body.account_filters;
  const tokenResponse = await plaidClient.linkTokenCreate({
    user: { client_user_id: process.env.PLAID_CLIENT_ID },
    client_name: "Spent",
    language: "en",
    products,
    country_codes: ["US"],
    account_filters,
  });
  return res.json(tokenResponse.data);
}
