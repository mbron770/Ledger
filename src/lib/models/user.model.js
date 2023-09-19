import mongoose from "mongoose";
import { itemSchema } from "../models/item.model";
// import { jobsSchema } from "./jobs.model";
import { incomeSchema } from "./income.model"

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    items: [itemSchema],
    // jobs: [jobsSchema],
    income: [incomeSchema],
    data: mongoose.Schema.Types.Mixed,
  },
  { strict: false, timestamps: true }
);

let User;

if (mongoose.models && mongoose.models.User) {
  User = mongoose.models.User;
} else {
  User = mongoose.model("User", userSchema);
}

export default User;
