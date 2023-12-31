import 'dotenv/config';
import 'express-async-errors';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { logger } from "./utils/logger.utils.js";
import { resourceNotFoundHandler } from "./middleware/resource-not-found-handler.js";
import { errorHandlingMiddleware } from "./middleware/error-handling.middleware.js";
import connectDB from "./config/db.js";
import {router} from "./routes/index.js";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use("/", router);

app.use(resourceNotFoundHandler);
app.use(errorHandlingMiddleware);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
