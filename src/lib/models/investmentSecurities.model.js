import mongoose from 'mongoose';

const investmentSecuritiesSchema = new mongoose.Schema({
    close_price: {type: Number, required: true}, 
    name: {type: String, required: true}, 
    type: { type: String},
    ticker_symbol: {type: String, required: true},
})

export { investmentSecuritiesSchema }







