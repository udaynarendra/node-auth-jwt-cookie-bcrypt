import express from 'express';
import {register,login} from '../controller/authController.js';
import verify from '../middlewares/authMiddleware.js';
import profile from '../controller/userController.js';
const router = express.Router();
router.post('/register',register)
router.post('/login',login)
router.get('/profile',verify,profile);
export default router;