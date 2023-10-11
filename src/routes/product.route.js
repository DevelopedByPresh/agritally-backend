import express from 'express';
import productController from '../controllers/product.controller.js';
import {
  verifyToken,
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin,
} from "../middleware/auth.verifyToken.js";

const productRouter = express.Router();

productRouter.post("/add", verifyStaff, productController.createProduct);

productRouter.get("/get/:id", verifyStaff, productController.getOne);

productRouter.get("/getAll", verifyStaff, productController.getAll);

productRouter.patch(
  "/update/:id",
  verifyManager,
  productController.updateProductItem
);

productRouter.delete('/delete/:id', verifyOwner, productController.delete);

export default productRouter;
