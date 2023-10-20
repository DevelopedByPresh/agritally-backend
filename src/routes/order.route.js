import express from 'express';
import { OrderController} from '../controllers/index.js';
import {
  verifyStaff,
  verifyManager,
  verifyOwner,
} from "../middleware/auth.verifyToken.js"; 

const orderRouter = express.Router();

orderRouter.post('/add', verifyStaff, OrderController.createOrder);
orderRouter.get('/get/:id', verifyStaff,  OrderController.getOne);
orderRouter.get('/user', verifyStaff, OrderController.getAllUserOrder);
orderRouter.get('/getAll', verifyManager, OrderController.getAll);
orderRouter.patch('/update/:id', verifyManager, OrderController.updateOrder);
orderRouter.delete('/delete/:id', verifyOwner, OrderController.delete);

export default orderRouter;
