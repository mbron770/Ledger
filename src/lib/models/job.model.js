import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  dateAdded: { type: Date, default: Date.now() },
  employerName: { type: String},
  title: {type: String},
  pay: { type: Number},
  rate: { type: String} 
});

export { jobSchema };
