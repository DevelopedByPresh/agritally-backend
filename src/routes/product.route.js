const express = require('express');
const productController = require('../controllers/product.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const productRouter = express.Router();

productRouter.post('/add', verifyStaff, productController.createProduct);
productRouter.get('/get/:id', verifyStaff,  productController.getOne);
productRouter.get('/getAll', verifyManager, productController.getAll);
productRouter.patch('/update/:id', verifyManager, productController.updateProductItem);
productRouter.delete('/delete/:id', verifyOwner, productController.delete);


module.exports = productRouter;

