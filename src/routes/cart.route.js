import express from 'express';
import cartController from '../controllers/cart.controller.js';
import {
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin,
} from '../middleware/auth.verifiyToken.js';

const cartRouter = express.Router();

cartRouter.post('/add', verifyStaff, cartController.addToCart);
cartRouter.get('/get/:id', verifyStaff, cartController.getOne);
cartRouter.get('/getAll', verifyManager, cartController.getAll);
cartRouter.patch('/update/:id', verifyManager, cartController.updateCartItem);
cartRouter.put('/remove/:id', verifyManager, cartController.removeCartItem);
cartRouter.delete('/delete/:id', verifyOwner, cartController.delete);

export default cartRouter;
