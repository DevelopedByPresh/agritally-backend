import express from 'express';
import orderController from '../controllers/order.controller.js';
import { verifyStaff, verifyManager, verifyOwner } from '../middleware/auth.verifiyToken.js'; 

const orderRouter = express.Router();

orderRouter.post('/add', verifyStaff, orderController.createOrder);
orderRouter.get('/get/:id', verifyStaff,  orderController.getOne);
orderRouter.get('/user', verifyManager, orderController.getAllUserOrder);
orderRouter.get('/getAll', verifyManager, orderController.getAll);
orderRouter.patch('/update/:id', verifyManager, orderController.updateOrderItem);
orderRouter.delete('/delete/:id', verifyOwner, orderController.delete);

export default orderRouter;
