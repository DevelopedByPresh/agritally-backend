const express = require('express');
const orderController = require('../controllers/order.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const orderRouter = express.Router();

orderRouter.post('/add', verifyStaff, orderController.createOrder);
orderRouter.get('/get/:id', verifyStaff,  orderController.getOne);
orderRouter.get('/getAll', verifyManager, orderController.getAll);
orderRouter.patch('/update/:id', verifyManager, orderController.updateOrderItem);
orderRouter.delete('/delete/:id', verifyOwner, orderController.delete);


module.exports = orderRouter;

