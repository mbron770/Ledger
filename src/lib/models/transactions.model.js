import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    date: {type: Date, required: true}, 
    name: {type: String, required: true}, 
    category: {type: String, required: true}, 
    paymentChannel: {type: String, required: true}, 
    amount: {type: Number, required: true},
    pending: {type: Boolean, required: true}
})

// const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
// export default (Transaction, transactionSchema)

// let Transaction;

// if (mongoose.models && mongoose.models.Transaction) {
//     Transaction = mongoose.models.Transaction;
// } else {
//     Transaction = mongoose.model('Transaction', transactionSchema);
// }
// console.log("Transactions model loaded");
// export default Transaction; 

export { transactionSchema }
