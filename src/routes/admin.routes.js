import { Router } from "express";

import { AdminController, UserController } from "../controllers/index.js";
import {
  createAdminRequestValidator,
  updateAdminRequestValidator,
} from "../validators/index.js";
import { CreateAdminRequestDto, UpdateAdminRequestDto } from "../dtos/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";

const adminRouter = Router();
const { OWNER, SUPERADMIN } = ADMIN_ROLE;

adminRouter.post(
  "/register",
  auth,
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
  AdminController.changeUserRole
);

adminRouter.delete(
  "/delete:id",
  auth,
  authorizeRoles(OWNER, SUPERADMIN),
  AdminController.deleteAdmin
);

adminRouter.get(
  "/users/getAll",
  auth,
  UserController.getAll
);

export default adminRouter;
