import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    // date: {type: String, required: true}, 
    dateAdded: {type: Date, default: Date.now(), required: true}, 
    name: {type: String, required: true}, 
    accountNumber: {type: String, required: true}, 
    type: {type: String, required: true}, 
    balance: {type: Number, required: true}
})

// const Account = mongoose.models.Account || mongoose.model('Account', accountSchema)
// export default (Account, accountSchema)


let Account;

if (mongoose.models && mongoose.models.Account) {
    Account = mongoose.models.Account;
} else {
    Account = mongoose.model('Account', accountSchema);
}

export default Account; 

