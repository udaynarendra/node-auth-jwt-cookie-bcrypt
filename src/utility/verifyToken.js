import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}
export default verifyRefreshToken;
