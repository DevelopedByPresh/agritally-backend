import express from "express";
import adminRouter from "./admin.route.js";
import cartRouter from "./cart.route.js";
import catFishRouter from "./cat-fish.route.js";
import eggRouter from "./egg.route.js";
import orderRouter from "./order.route.js";
import pigRouter from "./pig.route.js";
import poultryRouter from "./poultry.route.js";
import productRouter from "./product.route.js";
import transactionRouter from "./transaction.route.js";
import userRouter from "./user.route.js";

export const router = express.Router();

router.use("/admin", adminRouter);
router.use("/cart", cartRouter);
router.use("/catFish", catFishRouter);
router.use("/egg", eggRouter);
router.use("/order", orderRouter);
router.use("/pig", pigRouter);
router.use("/poultry", poultryRouter);
router.use("/product", productRouter);
router.use("/transaction", transactionRouter);
router.use("/user", userRouter);
