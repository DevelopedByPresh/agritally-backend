import express from "express";

import { CartController } from "../controllers/index.js";

import {
  createCartRequestValidator,
  updateCartRequestValidator,
  updateCartItemsRequestValidator
} from "../validators/index.js";
import {
  CreateCartRequestDto,
  UpdateCartItemsRequestDto,
  UpdateCartRequestDto,
} from "../dtos/cart/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import {idValidator} from '../validators/lib/common-validators.js'

const cartRouter = express.Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

cartRouter.post(
  "/add",
  auth,
  ValidateRequest.with(createCartRequestValidator, CreateCartRequestDto),
  CartController.addToCart
);

cartRouter.get("/getAll", auth, CartController.getAll);

cartRouter.get("/get/:id", auth, ValidateRequest.with(idValidator), CartController.getOne);

cartRouter.get(
  "/:userId",
  auth, 
  // authorizeRoles(MANAGER, OWNER, SUPERADMIN),
  CartController.fetchUserCart
);

cartRouter.patch("/update/:id", auth, ValidateRequest.with(updateCartRequestValidator, UpdateCartRequestDto ), CartController.updateCart);

cartRouter.patch(
  "/update/:id",
  auth,
  ValidateRequest.with(updateCartItemsRequestValidator, UpdateCartItemsRequestDto),
  CartController.updateCartItem
);

cartRouter.patch("/remove/:id", auth, ValidateRequest.with(updateCartRequestValidator, UpdateCartRequestDto), CartController.removeCartItem);

cartRouter.delete("/delete/:id", auth, ValidateRequest.with(idValidator), CartController.delete);

export default cartRouter;
