import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
 const connectDB=async()=>{
   try{
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('DataBase is connected');
   }
   catch(error){
      return res.status(500).json(apiResponse(false,'Internal Server Error'));
   }
 }
 export default connectDB;