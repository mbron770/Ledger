import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    dateAdded: {type: Date, default: Date.now()},
    incomeType: {type: String, required: true}, 
    jobTitle: {type: String, required: true}, 
    company: {type: String, required: true}, 
    payType: {type: String, required: true}, 
    paySchedule: {type: String, required: true}, 
    takeHomePay: {type: Number, required: true}, 
    yearlySalary: {type: Number},
    hourlyRate: {type: Number}, 
    hoursPerWeek: {type: Number},  

})

export { incomeSchema }