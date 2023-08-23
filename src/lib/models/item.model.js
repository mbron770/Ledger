import mongoose from 'mongoose'
import { transactionSchema } from '../models/transactions.model'; 
import { checkingAccountSchema } from './checkingAccount.model';
import { investmentAccountSchema } from '../models/investmentAccount.model' 
import { creditCardSchema } from '../models/creditCard.model' 
import { savingsAccountSchema } from '../models/savingsAccount.model'

const itemSchema = new mongoose.Schema({
    accessToken: {type: String, required: true}, 
    itemType: {type: String /*, required: true*/},
    creditCards: [creditCardSchema], 
    checkingAccounts: [checkingAccountSchema], 
    savingsAccounts: [savingsAccountSchema], 
    investmentAccounts: [investmentAccountSchema]

    // accounts: [accountSchema], 
    // transactions: [transactionSchema],
    
    

    // transactions: [transactionSchema || new mongoose.Schema({})], 
    // accounts: [accountSchema || new mongoose.Schema({})],
    // user: {type: String, ref: 'User', required: true},
    // accounts: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Account'
    // }], 
    // transactions: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Transactions'
    // }]
    
    // user: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User'
    //     // required: true 
    // }
})

// const Item = mongoose.model('Item', itemSchema)
// export default Item

// let Item;

// if (mongoose.models && mongoose.models.Item) {
//     Item = mongoose.models.Item;
// } else {
//     Item = mongoose.model('Item', itemSchema);
// }
// console.log("Item model loaded");

// export default Item; 

export { itemSchema }
