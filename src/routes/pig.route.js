const express = require('express');
const pigController = require('../controllers/pig.controller');
const authMiddleware = require('../middleware/auth.verifiyToken');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const pigRouter = express.Router();

pigRouter.post('/add', pigController.addPigItem);
pigRouter.get('/get/:id',  pigController.getOne);
pigRouter.get('/getAll', pigController.getAll);
pigRouter.patch('/update/:id', pigController.updatePigItem);
pigRouter.delete('/delete/:id', pigController.delete);


module.exports = pigRouter;

