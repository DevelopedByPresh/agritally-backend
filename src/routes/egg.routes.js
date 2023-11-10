import { Router } from "express";

import { EggController } from "../controllers/index.js";
import {
  createEggRequestValidator,
  updateEggRequestValidator,
} from "../validators/index.js";
import { CreateEggRequestDto, UpdateEggRequestDto } from "../dtos/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import {idValidator} from '../validators/lib/common-validators.js'


const eggRouter = Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

eggRouter.post("/", auth, ValidateRequest.with(createEggRequestValidator, CreateEggRequestDto), EggController.create);

eggRouter.get("/", auth, EggController.showAll);

eggRouter.get("/statistics", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), EggController.statistics);

eggRouter.get("/:id", auth, ValidateRequest.with(idValidator), EggController.get);


eggRouter.patch("/", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), ValidateRequest.with(updateEggRequestValidator, UpdateEggRequestDto), EggController.update);

eggRouter.delete("/:id", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), EggController.delete);

export default eggRouter;
