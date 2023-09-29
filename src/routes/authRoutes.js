import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.verifyToken.js';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;
