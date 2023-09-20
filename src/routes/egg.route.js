const express = require('express');
const eggController = require('../controllers/egg.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); // Adjust the import path

const eggRouter = express.Router();

eggRouter.post('/add', verifyStaff, eggController.addEggItem);
eggRouter.get('/get/:id', verifyStaff, eggController.getOne);
eggRouter.get('/getAll', verifyManager, eggController.getAll);
eggRouter.patch('/update/:id',  verifyManager, eggController.updateEggItem);
eggRouter.delete('/delete/:id', verifyOwner, eggController.delete);

module.exports = eggRouter;
