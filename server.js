import express from 'express';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/',router)
app.listen(5000,()=>console.log('server is running on 5000 port'));
export default app;