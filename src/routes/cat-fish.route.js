import express from "express";
import catFishController from "../controllers/cat-fish.controller.js";
import {
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin,
} from "../middleware/auth.verifyToken.js";

const catFishRouter = express.Router();

catFishRouter.post("/add", verifyStaff, catFishController.addCatFishItem);
catFishRouter.get("/get/:id", verifyStaff, catFishController.getOne);
catFishRouter.get("/getAll", verifyManager, catFishController.getAll);
catFishRouter.patch(
  "/update/:id",
  verifyManager,
  catFishController.updateCatFishItem
);
catFishRouter.delete("/delete/:id", verifyOwner, catFishController.delete);

export default catFishRouter;
