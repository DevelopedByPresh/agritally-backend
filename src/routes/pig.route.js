const express = require('express');
const pigController = require('../controllers/pig.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const pigRouter = express.Router();

pigRouter.post('/add', verifyStaff, pigController.addPigItem);
pigRouter.get('/get/:id', verifyStaff,  pigController.getOne);
pigRouter.get('/getAll', verifyManager, pigController.getAll);
pigRouter.patch('/update/:id', verifyManager, pigController.updatePigItem);
pigRouter.delete('/delete/:id', verifyOwner, pigController.delete);


module.exports = pigRouter;

