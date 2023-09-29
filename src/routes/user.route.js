import express from 'express';
import userController from '../controllers/user.controller.js';
import { verifyToken, verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } from '../middleware/auth.verifiyToken.js';

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/get/:id', verifyStaff, userController.getOne);
userRouter.get('/getAll', verifyManager, userController.getAll);
userRouter.patch('/update-profile/:id', verifyManager, userController.updateProfile);
userRouter.delete('/delete/:id', verifyOwner, userController.deleteUser);

export default userRouter;
