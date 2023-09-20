const express = require('express');
const catFishController = require('../controllers/cat-fish.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); 

const catFishRouter = express.Router();

catFishRouter.post('/add', verifyStaff, catFishController.addCatFishItem);
catFishRouter.get('/get/:id', verifyStaff, catFishController.getOne);
catFishRouter.get('/getAll', verifyManager, catFishController.getAll);
catFishRouter.patch('/update/:id', verifyManager, catFishController.updateCatFishItem);
catFishRouter.delete('/delete/:id', verifyOwner, catFishController.delete);

module.exports = catFishRouter;
