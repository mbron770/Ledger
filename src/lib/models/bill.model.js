import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    billType: {
        type: String
    },
    description: {
        type: String
    },
    company: {
        type: String
    },
    payFrequency: {
        type: String
    },
    billTotal: {
        type: Number
    }
})

export {
    billSchema
}
