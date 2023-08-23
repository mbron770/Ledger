import mongoose from 'mongoose';
import { transactionSchema } from './transactions.model';

const savingsAccountSchema = new mongoose.Schema({
    dateAdded: {type: Date, default: Date.now(), required: true}, 
    name: {type: String, required: true}, 
    accountNumber: {type: String, required: true},
    balance: {type: Number, required: true}, 
    transactions: [transactionSchema]
})

// const Account = mongoose.models.Account || mongoose.model('Account', accountSchema)
// export default (Account, accountSchema)


// let Account;

// if (mongoose.models && mongoose.models.Account) {
//     Account = mongoose.models.Account;
// } else {
//     Account = mongoose.model('Account', accountSchema);
// }

// export default Account; 

export { savingsAccountSchema }

