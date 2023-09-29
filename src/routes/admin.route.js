// admin.route.mjs
import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { verifyToken, verifyManager, verifyOwner } from '../middleware/auth.verifiyToken.js';

const adminRouter = express.Router();

adminRouter.post('/register', adminController.register);
adminRouter.post('/login', adminController.login);
adminRouter.get('/get/:id', verifyToken, adminController.getOne);
adminRouter.get('/getAll', verifyManager, adminController.getAll);
adminRouter.patch('/update-profile/:id', verifyManager, adminController.updateProfile);
adminRouter.delete('/delete/:id', verifyOwner, adminController.deleteAdmin);

export default adminRouter;
