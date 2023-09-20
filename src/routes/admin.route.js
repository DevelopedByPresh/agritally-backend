const express = require('express');
const adminController = require('../controllers/admin.controller');
const { verifyToken, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken');


const adminRouter = express.Router();

adminRouter.post('/register', adminController.register);
adminRouter.post('/login', adminController.login);
adminRouter.get('/get/:id', verifyToken, adminController.getOneAdmin);
adminRouter.get('/getAll', verifyManager, adminController.getAllAdmins);
adminRouter.patch('/update-profile/:id', verifyManager, adminController.updateProfile);
adminRouter.delete('/delete/:id', verifyOwner, adminController.deleteAdmin);

module.exports = adminRouter;

