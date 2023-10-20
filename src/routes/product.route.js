import express from 'express';
import { ProductController} from '../controllers/index.js';
import {
  verifyToken,
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin,
} from "../middleware/auth.verifyToken.js";

const productRouter = express.Router();

productRouter.post("/add", verifyStaff, ProductController.createProduct);

productRouter.get("/get/:id", verifyStaff, ProductController.getOne);

productRouter.get("/getAll", verifyStaff, ProductController.getAll);

productRouter.patch(
  "/update/:id",
  verifyManager,
  ProductController.updateProductItem
);

productRouter.delete('/delete/:id', verifyOwner, ProductController.delete);

export default productRouter;
