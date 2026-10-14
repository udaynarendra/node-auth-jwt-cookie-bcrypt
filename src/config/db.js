import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
 const connectDB=async()=>{
   try{
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('DataBase is connected');
   }
   catch(error){
      console.error("MongoDB connection failed:", error.message);
    throw error;
   }
 }
 export default connectDB;
