const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { logger } = require("./utils/logger.utils");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const poultryRouter = require("./routes/poultry.route");
const pigRouter = require("./routes/pig.route");
const catFishRouter = require("./routes/cat-fish.route");
const eggRouter = require("./routes/egg.route");
const orderRouter = require("./routes/order.route");
const productRouter = require("./routes/product.route");
// const { errorHandlingMiddleware, resourceNotFoundHandler } = require("./middleware/index"); 


const app = express();
app.use(cors({ credentials: true }));
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

// app.use(resourceNotFoundHandler);
// app.use(errorHandlingMiddleware);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
