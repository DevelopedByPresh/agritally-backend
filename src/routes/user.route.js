const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.verifiyToken');
const { verifyToken, verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken');

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/get/:id', verifyStaff, userController.getOneUser);
userRouter.get('/getAll', verifyManager, userController.getAllUsers);
userRouter.patch('/update-profile/:id', verifyManager, userController.updateProfile);
userRouter.delete('/delete/:id', verifyOwner, userController.deleteUser);


module.exports = userRouter;

