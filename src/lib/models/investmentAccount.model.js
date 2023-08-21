import mongoose from 'mongoose';
import { investmentTransactionsSchema } from '../models/investmentTransactions.model'; 
import { investmentHoldingsSchema } from '../models/investmentHoldings.model';
import { investmentSecuritiesSchema } from '../models/investmentSecurities.model'


const investmentAccountSchema = new mongoose.Schema({
    dateAdded: {type: Date, default: Date.now()},
    name: {type: String, required: true}, 
    accountNumber: {type: String, required: true}, 
    type: {type: String, required: true}, 
    balance: {type: Number, required: true},
    transactions: [investmentTransactionsSchema],
    holdings: [investmentHoldingsSchema],
    securities: [investmentSecuritiesSchema]

})

export { investmentAccountSchema }