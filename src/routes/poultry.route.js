import express from 'express';
import poultryController from '../controllers/poultry.controller.js';
import { verifyStaff, verifyManager, verifyOwner, verifySuperAdmin } from '../middleware/auth.verifiyToken.js';

const poultryRouter = express.Router();

poultryRouter.post('/add', verifyStaff, poultryController.addPoultryItem);
poultryRouter.get('/get/:id', verifyStaff, poultryController.getOne);
poultryRouter.get('/getAll', verifyManager, poultryController.getAll);
poultryRouter.patch('/update/:id', verifyManager, poultryController.updatePoultryItem);
poultryRouter.delete('/delete/:id', verifyOwner, poultryController.delete);

export default poultryRouter;
