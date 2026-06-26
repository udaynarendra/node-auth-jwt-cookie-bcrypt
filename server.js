import express from 'express';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import apiResponse from './utility/apiResponse.js';


const app = express();
app.use(cors({   origin: 'http://localhost:3000',
    credentials: true}))

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',router)
async function Start() {
    try{
     connectDB();
     app.listen(5000,()=>console.log('server is running on 5000 port'));

    }
    catch(error){
        return res.status(500).json(apiResponse('Database connection failed'));
        process.exit(1);
    }
}
Start();
