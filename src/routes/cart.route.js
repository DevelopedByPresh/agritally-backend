import express from 'express';
import cartController from '../controllers/cart.controller.js';
import {
  verifyStaff,
  verifyManager,
  verifyOwner,
} from "../middleware/auth.verifyToken.js";

const cartRouter = express.Router();

cartRouter.post('/add', verifyStaff, cartController.addToCart);

cartRouter.get("/getAll", verifyManager, cartController.getAll);

cartRouter.get("/get/:id", verifyStaff, cartController.getOne);

cartRouter.get("/:userId", verifyStaff, cartController.fetchUserCart);

cartRouter.post("/active/:id", verifyStaff, cartController.updateCart);

cartRouter.patch("/update/:id", verifyStaff, cartController.updateCartItem);

cartRouter.delete("/remove/:id", verifyStaff, cartController.removeCartItem);

cartRouter.delete('/delete/:id', verifyOwner, cartController.delete);

export default cartRouter;

