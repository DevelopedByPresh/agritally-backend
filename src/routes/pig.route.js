const express = require('express');
const pigController = require('../controllers/pig.controller');
const authMiddleware = require('../middleware/auth.verifiyToken');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const pigRouter = express.Router();

pigRouter.post('/add', pigController.addPigItem);
// poultryRouter.get('/get/:id',  pigController.getOne);
// poultryRouter.get('/getAll', pigController.getAll);
// poultryRouter.patch('/update/:id', authMiddleware.verifyManager, pigController.updatePoultryItem);
// poultryRouter.delete('/delete/:id', pigController.delete);


module.exports = pigRouter;

