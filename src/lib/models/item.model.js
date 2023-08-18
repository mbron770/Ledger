import mongoose from 'mongoose'
import User from "../models/user.model";
import { transactionSchema } from '../models/transactions.model';
import { accountSchema } from '../models/account.model'

// const userItems = await Item.find({ user: userId })

const itemSchema = new mongoose.Schema({
    accessToken: {type: String, required: true},
    transactions: [transactionSchema], 
    accounts: [accountSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
})

const Item = mongoose.model('Item', itemSchema)
export default Item