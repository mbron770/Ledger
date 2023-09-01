// import mongoose from "mongoose";
// mongoose.set("debug", true);

// let isConnected = false;

// export const connectToDB = async () => {
//   mongoose.set("strictQuery", true);

//   // if (!process.env.MONGODB_URI) return console.log("MONGODB_URL not found");

//   if (isConnected) return console.log("Connected to MONGODB");

//   try {
//     await mongoose
//       .connect(process.env.MONGODB_URI)
//       .catch((error) => console.error("Database connection error:", error));
//     isConnected = true;

//     console.log("2. Connect to Mongo");
//   } catch (error) {
//     console.log(error);
//   }
// };



import mongoose from 'mongoose';

const connection = {};

export default async function connectToDB() {
  if (connection.isConnected) {
    return console.log('mongo connection established')
  }

  if (!connection.isConnected) {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
  }
}


