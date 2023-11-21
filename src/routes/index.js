import express from "express";
import adminRouter from "./admin.routes.js";
import cartRouter from "./cart.routes.js";
import eggRouter from "./egg.routes.js";
import fishRouter from "./fish.route.js";
import orderRouter from "./order.routes.js";
import poultryRouter from "./poultry.routes.js";
import productRouter from "./product.routes.js";
import pigRouter from "./pig.routes.js";
import transactionRouter from "./transaction.routes.js";
import userRouter from "./user.routes.js";

export const router = express.Router();

router.use("/admin", adminRouter);
router.use("/cart", cartRouter);
router.use("/egg", eggRouter);
router.use("/fish", fishRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/poultry", poultryRouter);
router.use("/pig", pigRouter);
router.use("/transaction", transactionRouter);
router.use("/user", userRouter);
