import { plaidClient } from '../../lib/plaid';

export default async function handler(req, res) {
    const tokenResponse = await plaidClient.linkTokenCreate({
        user: { client_user_id: process.env.PLAID_CLIENT_ID },
        client_name: 'Spent' , 
        language: 'en', 
        products: ['auth'], 
        country_codes: ['US'], 

    })
    return res.json(tokenResponse.data)
}