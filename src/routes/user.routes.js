import express from "express";
import { UserController } from "../controllers/index.js";

import {
  createUserRequestValidator,
  updateUserRequestValidator,
} from "../validators/index.js";
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
} from "../dtos/user/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import { idValidator } from "../validators/lib/common-validators.js";

const userRouter = express.Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

userRouter.post(
  "/register",
  ValidateRequest.with(createUserRequestValidator, CreateUserRequestDTO),
  UserController.register
);
userRouter.post("/login", UserController.login);
userRouter.get(
  "/getAll",
  auth,
  authorizeRoles(MANAGER, OWNER, SUPERADMIN),
  UserController.getAll
);
userRouter.get(
  "/get/:id",
  auth,
  ValidateRequest.with(idValidator),
  UserController.getOne
);
userRouter.patch(
  "/update-profile/:id",
  auth,
  ValidateRequest.with(updateUserRequestValidator, UpdateUserRequestDTO),
  UserController.updateProfile
);
userRouter.delete(
  "/delete/:id",
  auth,
  authorizeRoles(MANAGER, OWNER, SUPERADMIN),
  ValidateRequest.with(idValidator),
  UserController.deleteUser
);

export default userRouter;
