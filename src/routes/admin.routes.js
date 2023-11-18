import { Router } from "express";

import { AdminController, UserController } from "../controllers/index.js";
import {
  createAdminRequestValidator,
  updateAdminRequestValidator,
  updateUserRequestValidator
} from "../validators/index.js";
import { CreateAdminRequestDto, UpdateAdminRequestDto, UpdateUserRequestDTO } from "../dtos/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import { idValidator } from "../validators/lib/common-validators.js";


const adminRouter = Router();
const { OWNER, SUPERADMIN } = ADMIN_ROLE;

adminRouter.post(
  "/register",
  ValidateRequest.with(createAdminRequestValidator, CreateAdminRequestDto),
  AdminController.register
);

adminRouter.post("/login", AdminController.login);

adminRouter.get(
  "/getAll",
  auth,
  AdminController.getAll
);

adminRouter.get(
  "/get/:id",
  auth,
  AdminController.getOne
);

adminRouter.patch(
  "/update-profile/:id",
  auth,
  ValidateRequest.with(updateAdminRequestValidator, UpdateAdminRequestDto),
  AdminController.updateProfile
);

adminRouter.patch(
  "/change-role/:id",
  auth,
  ValidateRequest.with(updateUserRequestValidator, UpdateUserRequestDTO),
  AdminController.changeUserRole
);

adminRouter.delete(
  "/delete/:id",
  auth,
  ValidateRequest.with(idValidator),
  authorizeRoles(OWNER, SUPERADMIN),
  AdminController.deleteAdmin
);

adminRouter.get(
  "/users/getAll",
  auth,
  ValidateRequest.with(idValidator),
  UserController.getAll
);

export default adminRouter;
