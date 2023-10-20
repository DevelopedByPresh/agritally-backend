import express from "express";
import { AdminController, UserController } from "../controllers/index.js";
import {
  verifyToken,
  verifyManager,
  verifyOwner,
} from "../middleware/auth.verifyToken.js";

const adminRouter = express.Router();

adminRouter.post("/register", AdminController.register);
adminRouter.post("/login", AdminController.login);
adminRouter.get("/get/:id", verifyToken, AdminController.getOne);
adminRouter.get("/getAll", verifyManager, AdminController.getAll);
adminRouter.patch(
  "/update-profile/:id",
  verifyManager,
  AdminController.updateProfile
);
adminRouter.delete("/delete/:id", verifyOwner, AdminController.deleteAdmin);

adminRouter.get("/users/getAll", verifyManager, UserController.getAll);

export default adminRouter;
