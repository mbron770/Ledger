import mongoose from "mongoose";
import { transactionSchema } from "./transactions.model";

const savingsAccountSchema = new mongoose.Schema({
  dateAdded: { type: Date, default: Date.now(), required: true },
  name: { type: String, required: true },
  accountNumber: { type: String, required: true },
  balance: { type: Number, required: true },
  transactions: [transactionSchema],
});

export { savingsAccountSchema };
