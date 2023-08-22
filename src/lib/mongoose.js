import mongoose from 'mongoose'
mongoose.set('debug', true)

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');


    if (isConnected) return console.log('Connected to MONGODB');

    try {
        await mongoose.connect(process.env.MONGODB_URL).catch(error => console.error('Database connection error:', error));
        isConnected = true;
        
        console.log('2. Connect to Mongo');

    } catch (error) {
        console.log(error);

    }

}

// export const connectToDB = async () => {
//     mongoose.set('strictQuery', false)

//     if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found')


//     if(isConnected) return console.log('Connected to MONGODB')

//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//         isConnected = true
//         console.log('2. Connect to Mongo')

//     }catch (error){
//         console.log(error)

//     }

// }


// import mongoose from 'mongoose';

// let isConnected = false;

// export const connectToDB = async () => {
//     if(!process.env.MONGODB_URL) {
//         console.error('MONGODB_URL not found');
//         return;
//     }

//     // Set Mongoose options here after checking for MONGODB_URL
//     mongoose.set('strictQuery', true);

//     // If already connected, return immediately
//     if (isConnected) {
//         console.log('Already connected to MongoDB');
//         return;
//     }

//     try {
//         await mongoose.connect(process.env.MONGODB_URL);
//         isConnected = true;
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Failed to connect to MongoDB', error);
//     }
// };






