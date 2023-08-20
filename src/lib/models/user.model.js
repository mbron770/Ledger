import mongoose from "mongoose";
import { itemSchema } from '../models/account.model'

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
  }], 
    // items: [itemSchema],
    data: mongoose.Schema.Types.Mixed,
    
    
    
    
  },
  { strict: false, timestamps: true }, 

  


      // threads: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Thread' // thread is a collection/table
    //     }



);

let User;

if (mongoose.models && mongoose.models.User) {
  User = mongoose.models.User;
} else {
  User = mongoose.model("User", userSchema);
}

export default User;
console.log("User model loaded");

