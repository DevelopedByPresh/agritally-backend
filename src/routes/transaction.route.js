import express from "express";
import { TransactionController } from "../controllers/index.js";
import {
  verifyToken,
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin,
} from "../middleware/auth.verifyToken.js";

const transactionRouter = express.Router();

transactionRouter.post("/add", verifyStaff, TransactionController.create);
 
transactionRouter.get("/get/:id", verifyStaff, TransactionController.one);

transactionRouter.get("/getAll", verifyStaff, TransactionController.showAll);

transactionRouter.patch(
  "/update/:id",
  verifyManager,
  TransactionController.modify
);

transactionRouter.delete(
  "/delete/:id",
  verifyOwner,
  TransactionController.destroy
);

export default transactionRouter;
