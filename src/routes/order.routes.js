import express from "express";

import { OrderController } from "../controllers/index.js";

import {
  createOrderRequestValidator,
  updateOrderRequestValidator,
} from "../validators/index.js";
import {
  CreateOrderRequestDTO,
  UpdateOrderRequestDTO,
} from "../dtos/order/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";

const orderRouter = express.Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

orderRouter.post("/add", auth, ValidateRequest.with(createOrderRequestValidator, CreateOrderRequestDTO), OrderController.createOrder);

orderRouter.get("/get/:id", auth, OrderController.getOne);

orderRouter.get("/user", auth, OrderController.getAllUserOrder);

orderRouter.get("/getAll", auth, OrderController.getAll);

orderRouter.patch("/update/:id", auth, ValidateRequest.with(updateOrderRequestValidator, UpdateOrderRequestDTO), OrderController.updateOrder);

orderRouter.delete(
  "/delete/:id",
  auth,
  authorizeRoles(MANAGER, OWNER, SUPERADMIN),
  OrderController.delete
);

export default orderRouter;
