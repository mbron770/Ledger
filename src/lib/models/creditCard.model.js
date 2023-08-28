import mongoose from "mongoose";
import { transactionSchema } from "../models/transactions.model";

const creditCardSchema = new mongoose.Schema({
  dateAdded: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  number: { type: String, required: true },
  currentBalance: { type: Number, required: true },
  creditLimit: { type: Number, required: true },
  transactions: [transactionSchema],
});

export { creditCardSchema };
