const express = require('express');
const cartController = require('../controllers/cart.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const cartRouter = express.Router();

cartRouter.post('/add', verifyStaff, cartController.addToCart);
cartRouter.get('/get/:id', verifyStaff, cartController.getOne);
cartRouter.get('/getAll', verifyManager, cartController.getAll);
cartRouter.patch('/update/:id',  verifyManager, cartController.updateCartItem);
cartRouter.put('/remove/:id',  verifyManager, cartController.removeCartItem);
cartRouter.delete('/delete/:id', verifyOwner, cartController.delete);

module.exports = cartRouter;
