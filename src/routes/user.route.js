import express from "express";
import { UserController } from "../controllers/index.js";
import {
  verifyToken,
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin,
} from "../middleware/auth.verifyToken.js";

const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/get/:id", verifyStaff, UserController.getOne);
userRouter.patch(
  "/update-profile/:id",
  verifyManager,
  UserController.updateProfile
);
userRouter.delete("/delete/:id", verifyOwner, UserController.deleteUser);

export default userRouter;
