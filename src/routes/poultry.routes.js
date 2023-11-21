import { Router } from "express";

import { PoultryController } from "../controllers/index.js";
import {
  createPoultryRequestValidator,
  updatePoultryRequestValidator,
} from "../validators/index.js";
import { CreatePoultryRequestDto, UpdatePoultryRequestDto } from "../dtos/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import { idValidator } from '../validators/lib/common-validators.js';

const poultryRouter = Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

poultryRouter.post("/", auth, ValidateRequest.with(createPoultryRequestValidator, CreatePoultryRequestDto), PoultryController.create);

poultryRouter.get("/", auth, PoultryController.showAll);

poultryRouter.get("/statistics", auth, PoultryController.statistics);

poultryRouter.get("/:id", auth, ValidateRequest.with(idValidator), PoultryController.get);

poultryRouter.patch("/:id", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), ValidateRequest.with(updatePoultryRequestValidator, UpdatePoultryRequestDto), PoultryController.update);

poultryRouter.delete("/:id", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), PoultryController.delete);

export default poultryRouter;
