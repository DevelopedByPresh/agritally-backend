const express = require('express');
const catFishController = require('../controllers/cat-fish.controller');
const { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } = require('../middleware/auth.verifiyToken'); 

const catFishRouter = express.Router();

catFishRouter.post('/add', catFishController.addCatFishItem);
catFishRouter.get('/get/:id', catFishController.getOne);
catFishRouter.get('/getAll', catFishController.getAll);
catFishRouter.patch('/update/:id', catFishController.updateCatFishItem);
catFishRouter.delete('/delete/:id', catFishController.delete);

module.exports = catFishRouter;
