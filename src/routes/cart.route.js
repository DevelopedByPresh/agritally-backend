import express from 'express';
import { CartController} from '../controllers/index.js';
import {
  verifyStaff,
  verifyManager,
  verifyOwner,
} from "../middleware/auth.verifyToken.js";

const cartRouter = express.Router();

cartRouter.post('/add', verifyStaff, CartController.addToCart);

cartRouter.get("/getAll", verifyManager, CartController.getAll);

cartRouter.get("/get/:id", verifyStaff, CartController.getOne);

cartRouter.get("/:userId", verifyStaff, CartController.fetchUserCart);

cartRouter.post("/active/:id", verifyStaff, CartController.updateCart);

cartRouter.patch("/update/:id", verifyStaff, CartController.updateCartItem);

cartRouter.delete("/remove/:id", verifyStaff, CartController.removeCartItem);

cartRouter.delete('/delete/:id', verifyOwner, CartController.delete);

export default cartRouter;

