import express from 'express';
import pigController from '../controllers/pig.controller.js'; 
import { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } from '../middleware/auth.verifiyToken.js'; 

const pigRouter = express.Router();

pigRouter.post('/add', verifyStaff, pigController.addPigItem);
pigRouter.get('/get/:id', verifyStaff, pigController.getOne);
pigRouter.get('/getAll', verifyManager, pigController.getAll);
pigRouter.patch('/update/:id', verifyManager, pigController.updatePigItem);
pigRouter.delete('/delete/:id', verifyOwner, pigController.delete);

export default pigRouter;
