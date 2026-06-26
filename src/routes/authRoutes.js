import express from 'express';
import verify from '../../authMiddleware.js';
import profile from '../controller/userController.js';
import register from '../controller/register.controller.js';
import login from '../controller/login.controller.js';
import verifyEmail from '../controller/verifyEmail.controller.js';
import refreshToken from '../controller/refreshToken.controller.js';
import logOut from '../controller/logout.controller.js';
const router = express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/verifyEmail',verifyEmail);
router.get('/profile',verify,profile);
router.post('/refreshToken',refreshToken);
router.post('/logout',logOut)
export default router;