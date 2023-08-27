import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    date: {type: Date, required: true}, 
    name: {type: String, required: true}, 
    category: {type: String, required: true}, 
    paymentChannel: {type: String, required: true}, 
    amount: {type: Number, required: true},
    pending: {type: Boolean, required: true}
})

export { transactionSchema }
