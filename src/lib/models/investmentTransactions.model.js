import mongoose from "mongoose";


const investmentTransactionsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  fees: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
});

export { investmentTransactionsSchema };
