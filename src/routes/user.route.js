const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth.verifiyToken');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const router = express.Router();

// Use the verifyStaff middleware
router.get('/:id', authMiddleware.verifyStaff, authController.getOneUser);
router.get('/', authMiddleware.verifyManager, authController.getAllUsers);
router.get('/:id', authMiddleware.verifyManager, authController.getAllUsers);
router.delete('/:id', authMiddleware.verifyManager, authController.deleteUser);


module.exports = router;

