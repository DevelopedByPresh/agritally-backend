import express from "express";
import { userController } from "../controllers/index.js";
import {
  verifyToken,
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin,
} from "../middleware/auth.verifyToken.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/get/:id", verifyStaff, userController.getOne);
userRouter.patch(
  "/update-profile/:id",
  verifyManager,
  userController.updateProfile
);
userRouter.delete("/delete/:id", verifyOwner, userController.deleteUser);

export default userRouter;
