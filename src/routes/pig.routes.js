import { Router } from "express";

import { PigController } from "../controllers/index.js";
import {
  createPigRequestValidator,
  updatePigRequestValidator,
} from "../validators/index.js";
import { CreatePigRequestDto, UpdatePigRequestDto } from "../dtos/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import { idValidator } from '../validators/lib/common-validators.js';

const pigRouter = Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

pigRouter.post("/", auth, ValidateRequest.with(createPigRequestValidator, CreatePigRequestDto), PigController.create);

pigRouter.get("/", auth, PigController.showAll);

pigRouter.get("/statistics", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), PigController.statistics);

pigRouter.get("/:id", auth, ValidateRequest.with(idValidator), PigController.get);

pigRouter.patch("/:id", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), ValidateRequest.with(updatePigRequestValidator, UpdatePigRequestDto), PigController.update);

pigRouter.delete("/:id", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), PigController.delete);

export default pigRouter;
