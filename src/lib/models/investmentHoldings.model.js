import mongoose from 'mongoose';

const investmentHoldingsSchema = new mongoose.Schema({
    cost_basis: {type: Number, required: true},
    institution_price: {type: Number, required: true}, 
    institution_value: {type: Number, required: true}, 
    quantity: {type: Number, required: true},
    institution_price_as_of: {type: String}
})

export { investmentHoldingsSchema }