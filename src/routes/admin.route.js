import express from "express";
import { adminController, userController } from "../controllers/index.js";
import {
  verifyToken,
  verifyManager,
  verifyOwner,
} from "../middleware/auth.verifiyToken.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminController.register);
adminRouter.post("/login", adminController.login);
adminRouter.get("/get/:id", verifyToken, adminController.getOne);
adminRouter.get("/getAll", verifyManager, adminController.getAll);
adminRouter.patch(
  "/update-profile/:id",
  verifyManager,
  adminController.updateProfile
);
adminRouter.delete("/delete/:id", verifyOwner, adminController.deleteAdmin);

adminRouter.get("/users/getAll", verifyManager, userController.getAll);

export default adminRouter;
