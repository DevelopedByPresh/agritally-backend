const express = require('express');
const poultryController = require('../controllers/poultry.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const poultryRouter = express.Router();

poultryRouter.post('/add', verifyStaff, poultryController.addPoultryItem);
poultryRouter.get('/get/:id', verifyStaff,  poultryController.getOne);
poultryRouter.get('/getAll', verifyManager, poultryController.getAll);
poultryRouter.patch('/update/:id', verifyManager, poultryController.updatePoultryItem);
poultryRouter.delete('/delete/:id', verifyOwner, poultryController.delete);


module.exports = poultryRouter;

