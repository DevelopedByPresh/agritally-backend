const express = require('express');
const orderController = require('../controllers/order.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const poultryRouter = express.Router();

poultryRouter.post('/add', verifyStaff, orderController.addPoultryItem);
poultryRouter.get('/get/:id', verifyStaff,  orderController.getOne);
poultryRouter.get('/getAll', verifyManager, orderController.getAll);
poultryRouter.patch('/update/:id', verifyManager, orderController.updatePoultryItem);
poultryRouter.delete('/delete/:id', verifyOwner, orderController.delete);


module.exports = poultryRouter;

