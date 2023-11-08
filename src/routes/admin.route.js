import { Router } from 'express';

import { AdminController } from '../controllers/index.js';
import {
  createAdminRequestValidator,
  updateAdminRequestValidator,
} from '../validators/index.js';
import { CreateAdminRequestDto, UpdateAdminRequestDto } from '../dtos/index.js';
import { ValidateRequest } from '../middleware/validate-request.middleware.js';
import {
  verifyToken,
  verifyManager,
  verifyOwner,
} from "../middleware/auth.verifyToken.js";

const adminRouter = Router();

adminRouter.post('/register', ValidateRequest.with(createAdminRequestValidator, CreateAdminRequestDto), AdminController.register);

adminRouter.post('/login', AdminController.login);

adminRouter.get('/getAll', verifyManager, AdminController.getAll);

adminRouter.get('/get/:id', verifyToken, AdminController.getOne);

adminRouter.patch('/update-profile/:id', verifyManager, ValidateRequest.with(updateAdminRequestValidator, UpdateAdminRequestDto), AdminController.updateProfile);

adminRouter.patch('/change-role/:id', AdminController.changeUserRole);

adminRouter.delete('/delete:id', verifyOwner, AdminController.deleteAdmin);

adminRouter.get("/users/getAll", verifyManager, UserController.getAll);

export default adminRouter;
