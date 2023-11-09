import express from "express";
import { ProductController } from "../controllers/index.js";
import {
  createProductRequestValidator,
  updateProductRequestValidator,
} from "../validators/index.js";
import {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
} from "../dtos/product/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import { idValidator } from "../validators/lib/common-validators.js";

const productRouter = express.Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

productRouter.post(
  "/add",
  auth,
  ValidateRequest.with(createProductRequestValidator, CreateProductRequestDTO),
  ProductController.createProduct
);

productRouter.get(
  "/get/:id",
  auth,
  ValidateRequest.with(idValidator),
  ProductController.getOne
);

productRouter.get("/getAll", auth, ProductController.getAll);

productRouter.patch(
  "/update/:id",
  auth,
  authorizeRoles(MANAGER, OWNER, SUPERADMIN),
  ValidateRequest.with(updateProductRequestValidator, UpdateProductRequestDTO),
  ProductController.updateProductItem
);

productRouter.delete(
  "/delete/:id",
  auth,
  authorizeRoles(MANAGER, OWNER, SUPERADMIN),
  ValidateRequest.with(idValidator),
  ProductController.delete
);

export default productRouter;
