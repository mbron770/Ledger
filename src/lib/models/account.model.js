import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    // date: {type: String, required: true}, 
    name: {type: String, required: true}, 
    accountNumber: {type: String, required: true}, 
    type: {type: String, required: true}, 
    balance: Number
})

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema)
export default (Account, accountSchema)

