import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    // date: {type: String, required: true}, 
    date: Date,
    name: {type: String, required: true}, 
    category: {type: String, required: true}, 
    amount: Number
})

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
export default (Transaction, transactionSchema)

