import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { logger } from "./utils/logger.utils.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import poultryRouter from "./routes/poultry.route.js";
import pigRouter from "./routes/pig.route.js";
import catFishRouter from "./routes/cat-fish.route.js";
import eggRouter from "./routes/egg.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import { resourceNotFoundHandler } from "./middleware/resource-not-found-handler.js";
import { errorHandlingMiddleware } from "./middleware/error-handling.middleware.js";
import connectDB from "./config/db.js";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/poultry", poultryRouter);
app.use("/pig", pigRouter);
app.use("/egg", eggRouter);
app.use("/catFish", catFishRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.use(resourceNotFoundHandler);
app.use(errorHandlingMiddleware);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
