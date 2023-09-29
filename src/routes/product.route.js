import express from 'express';
import productController from '../controllers/product.controller.js';
import { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } from '../middleware/auth.verifiyToken.js';

const productRouter = express.Router();

productRouter.post('/add', verifyStaff, productController.createProduct);
productRouter.get('/get/:id', verifyStaff, productController.getOne);
productRouter.get('/getAll', verifyManager, productController.getAll);
productRouter.patch('/update/:id', verifyManager, productController.updateProductItem);
productRouter.delete('/delete/:id', verifyOwner, productController.delete);

export default productRouter;
