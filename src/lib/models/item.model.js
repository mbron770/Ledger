import mongoose from 'mongoose'
import User from "../models/user.model";
import { transactionSchema } from '../models/transactions.model';
import { accountSchema } from '../models/account.model'

// const userItems = await Item.find({ user: userId })

const itemSchema = new mongoose.Schema({
    access_token: {type: String, required: true},
    transactions: [transactionSchema || new mongoose.Schema({})], 
    accounts: [accountSchema || new mongoose.Schema({})],
    user: [new mongoose.Schema({})]
    // user: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User'
    //     // required: true 
    // }
})

// const Item = mongoose.model('Item', itemSchema)
// export default Item

let Item;

if (mongoose.models && mongoose.models.Item) {
    Item = mongoose.models.Item;
} else {
    Item = mongoose.model('Item', itemSchema);
}

export default Item; 
