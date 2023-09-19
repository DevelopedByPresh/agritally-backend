const express = require('express');
const eggController = require('../controllers/egg.controller');
const authMiddleware = require('../middleware/auth.verifiyToken');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const eggRouter = express.Router();

eggRouter.post('/add', eggController.addEggItem);
eggRouter.get('/get/:id', eggController.getOne);
eggRouter.get('/getAll', eggController.getAll);
eggRouter.patch('/update/:id', eggController.updateEggItem);
eggRouter.delete('/delete/:id', eggController.delete);

module.exports = eggRouter;
