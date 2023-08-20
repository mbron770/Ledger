// import { withIronSessionApiRoute } from 'iron-session/next';
// import { plaidClient, sessionOptions } from '../../lib/plaid';
// import { ClerkProvider, useUser, SignIn, SignedOut } from '@clerk/nextjs'
// import { connectToDB } from "../../lib/mongoose";
// import Item from '../../lib/models/item.model'
// import User from '../../lib/models/user.model'


// export default withIronSessionApiRoute(exchangePublicToken, sessionOptions);

// /*export default */async function exchangePublicToken(req, res) {
//   await connectToDB() 

//   try{
//     const exchangeResponse = await plaidClient.itemPublicTokenExchange({
//       public_token: req.body.public_token,
//     });
//     const userId = req.body.userId
//     console.log(userId)

//     const newItem = new Item({
//       accessToken: exchangeResponse.data.access_token,
//       user: userId 
//     })
//     await newItem.save()

    
//     const loggedInUser = await User.findById(userId)
//     loggedInUser.items.push(newItem._id)
//     await loggedInUser.save()
    
    

//     // const clerkUserId = req.headers['clerk-user-id']

//     // const user = await User.findOne({ clerkId: clerkUserId });
//     // if (!user) {
//     //   return res.status(401).send({ error: 'User not found.' });
//     // }

//      // const { user } = useUser() cant use this 

  

//   // req.session.access_token = exchangeResponse.data.access_token;
//   // await req.session.save()
//   res.send({ ok: true })


//   }catch(error){
//     console.log('error exchanging public token', error)
//     res.status(500).send({error: 'Server Error'})

//   }
  
  
  
 
  
    

  
// }

import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient, sessionOptions } from '../../lib/plaid';
import { connectToDB } from "../../lib/mongoose";
import Item from '../../lib/models/item.model';
import User from '../../lib/models/user.model';

export default withIronSessionApiRoute(exchangePublicToken, sessionOptions);

async function exchangePublicToken(req, res) {
  await connectToDB(); 

  
  let exchangeResponse;
  try {
    exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });
  } catch(error) {
    console.error('Error exchanging public token:', error);
    return res.status(500).send({ error: 'Failed to exchange public token' });
  }

  const userID = req.body?.userID;
  console.log(exchangeResponse.data.access_token)
  console.log(userID)
  
  // Save the new item
  let newItem;
  try {
    newItem = new Item({
      accessToken: exchangeResponse.data.access_token,
      user: userID
    });
    await newItem.save();
  } catch(error) {
    console.error('Error saving new item:', error);
    return res.status(500).send({ error: 'Failed to save the new item' });
  }
  
  try {
    const loggedInUser = await User.findOne({id: userID})
    if (!loggedInUser) {
      return res.status(404).send({ error: 'User not found' });
    }
    loggedInUser.items.push(newItem._id);
    await loggedInUser.save();
  } catch(error) {
    console.error('Error updating user with new item:', error);
    return res.status(500).send({ error: 'Failed to update user with new item' });
  }
  
  
  return res.send({ message: 'Access token successfully added to user\'s items' });
}
