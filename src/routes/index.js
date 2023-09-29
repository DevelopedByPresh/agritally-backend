import express from "express";
import userRouter from "./user.route.js";
import adminRouter from "./admin.route.js";
import poultryRouter from "./poultry.route.js";
import pigRouter from "./pig.route.js";
import catFishRouter from "./cat-fish.route.js";
import eggRouter from "./egg.route.js";
import orderRouter from "./order.route.js";
import productRouter from "./product.route.js";
import cartRouter from "./cart.route.js";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/poultry", poultryRouter);
router.use("/pig", pigRouter);
router.use("/egg", eggRouter);
router.use("/catFish", catFishRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

export default router;
