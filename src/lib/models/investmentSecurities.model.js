import mongoose from 'mongoose';

const investmentSecuritiesSchema = new mongoose.Schema({
    close_price: {type: Number}, 
    name: {type: String}, 
    type: { type: String},
    ticker_symbol: {type: String},
})

export { investmentSecuritiesSchema }







