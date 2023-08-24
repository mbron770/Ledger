import mongoose from 'mongoose';


const loanSchema = new mongoose.Schema({
    dateAdded: {type: Date, default: Date.now()},
    name: {type: String, required: true}, 
    accountNumber: {type: String, required: true}, 
    currentBalance: {type: Number}
})

export { loanSchema }