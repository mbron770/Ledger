import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    
    id: {type: String, required: true}, 
    username: {type: String, required: true},
    name: {type: String, required: true} 
    // image: String, 
    // bio: String, 
    // onboarded: {type: Boolean, default: false, required: true}
})

// const User = mongoose.models.User || mongoose.model('User', userSchema)

// export default User

let User;

if (mongoose.models && mongoose.models.User) {
    User = mongoose.models.User;
} else {
    User = mongoose.model('User', userSchema);
}

export default User; 

// const User = mongoose.model('User', userSchema);
// export default User;
console.log("User model loaded");

// // export default User;

