import mongoose from "mongoose";
import { checkingAccountSchema } from "./checkingAccount.model";
import { investmentAccountSchema } from "../models/investmentAccount.model";
import { creditCardSchema } from "../models/creditCard.model";
import { savingsAccountSchema } from "../models/savingsAccount.model";
import { loanSchema } from "../models/loan.model";

const itemSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  itemType: { type: String },
  creditCards: [creditCardSchema],
  checkingAccounts: [checkingAccountSchema],
  savingsAccounts: [savingsAccountSchema],
  investmentAccounts: [investmentAccountSchema],
  loans: [loanSchema],
});

export { itemSchema };
