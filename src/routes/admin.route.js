const express = require('express');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.verifiyToken');

const adminRouter = express.Router();

adminRouter.post('/register', adminController.register);
adminRouter.post('/login', adminController.login);
adminRouter.get('/get/:id', adminController.getOneAdmin);
adminRouter.get('/getAll', adminController.getAllAdmins);
adminRouter.patch('/update-profile/:id', adminController.updateProfile);
adminRouter.delete('/delete/:id', adminController.deleteAdmin);

module.exports = adminRouter;

