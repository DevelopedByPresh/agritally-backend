import express from 'express';
import eggController from '../controllers/egg.controller.js'; 
import { verifyStaff, verifyManager, verifyOwner } from '../middleware/auth.verifiyToken.js'; 

const eggRouter = express.Router();

eggRouter.post('/add', verifyStaff, eggController.addEggItem);
eggRouter.get('/get/:id', verifyStaff, eggController.getOne);
eggRouter.get('/getAll', verifyManager, eggController.getAll);
eggRouter.patch('/update/:id', verifyManager, eggController.updateEggItem);
eggRouter.delete('/delete/:id', verifyOwner, eggController.delete);

export default eggRouter;
