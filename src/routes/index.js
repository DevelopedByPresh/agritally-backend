import express from "express";
import adminRouter from "./admin.routes.js";
import cartRouter from "./cart.routes.js";
import eggRouter from "./egg.routes.js";
import orderRouter from "./order.routes.js";
import productRouter from "./product.routes.js";
import transactionRouter from "./transaction.routes.js";
import userRouter from "./user.routes.js";
import pigRouter from "./pig.routes.js";

export const router = express.Router();

router.use("/admin", adminRouter);
router.use("/cart", cartRouter);
router.use("/egg", eggRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/pig", pigRouter);
router.use("/transaction", transactionRouter);
router.use("/user", userRouter);
