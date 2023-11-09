import express from "express";
import { TransactionController } from "../controllers/index.js";

const transactionRouter = express.Router();

transactionRouter.post("/add", TransactionController.create);

transactionRouter.get("/get/:id", TransactionController.one);

transactionRouter.get("/getAll", TransactionController.showAll);

transactionRouter.patch("/update/:id", TransactionController.modify);

transactionRouter.delete("/delete/:id", TransactionController.destroy);

export default transactionRouter;
