const express = require('express');
const poultryController = require('../controllers/poultry.controller');
const authMiddleware = require('../middleware/auth.verifiyToken');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const poultryRouter = express.Router();

poultryRouter.post('/add', poultryController.addPoultryItem);
poultryRouter.get('/get/:id',  poultryController.getOne);
poultryRouter.get('/getAll', poultryController.getAll);
poultryRouter.patch('/update/:id', authMiddleware.verifyManager, poultryController.updatePoultryItem);
poultryRouter.delete('/delete/:id', poultryController.delete);


module.exports = poultryRouter;
