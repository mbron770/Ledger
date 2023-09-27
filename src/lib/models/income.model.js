import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    dateAdded: {type: Date, default: Date.now()},
    incomeType: {type: String}, 
    jobTitle: {type: String}, 
    company: {type: String}, 
    payType: {type: String}, 
    paySchedule: {type: String}, 
    takeHomePay: {type: Number}, 
    yearlySalary: {type: Number},
    hourlyRate: {type: Number}, 
    hoursPerWeek: {type: Number},  
})

export { incomeSchema }