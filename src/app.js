import express from 'express';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import requestHandler from './middlewares/error.middleware.js'
import cors from 'cors';
const app=express();
const app = express();
app.use(cors({   origin: 'http://localhost:3000',
    credentials: true}))

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',router);
app.use(requestHandler);
export default app;