const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.verifiyToken');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const userRouter = express.Router();

// Use the verifyStaff middleware
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/get/:id', authMiddleware.verifyStaff, userController.getOneUser);
userRouter.get('/getAll', authMiddleware.verifyManager, userController.getAllUsers);
userRouter.patch('/update-profile/:id', authMiddleware.verifyManager, userController.updateProfile);
userRouter.delete('/delete/:id', authMiddleware.verifyOwner, userController.deleteUser);


module.exports = userRouter;

