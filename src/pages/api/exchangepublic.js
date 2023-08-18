import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient, sessionOptions } from '../../lib/plaid';
import { ClerkProvider, useUser, SignIn, SignedOut } from '@clerk/nextjs'
import { connectToDB } from "../../lib/mongoose";
import Item from '../../lib/models/item.model'
import User from '../../lib/models/user.model'


// export default withIronSessionApiRoute(exchangePublicToken, sessionOptions);

export default async function exchangePublicToken(req, res) {
  await connectToDB; 

  try{
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    // const clerkUserId = req.headers['clerk-user-id']

    // const user = await User.findOne({ clerkId: clerkUserId });
    // if (!user) {
    //   return res.status(401).send({ error: 'User not found.' });
    // }

     // const { user } = useUser() cant use this 

  const newItem = new Item({
    accessToken: exchangeResponse.data.access_token
    // user: user 
  })
  await newItem.save()

  // req.session.access_token = exchangeResponse.data.access_token;
  // await req.session.save()
  res.send({ ok: true })


  }catch(error){
    console.log('error exchanging public token', error)
    res.status(500).send({error: 'Server Error'})

  }
  
  
  
 
  
    

  
}
