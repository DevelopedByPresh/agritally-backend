const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth.verifiyToken');

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

module.exports = authRouter;

