import { Router } from "express";

import { EggController } from "../controllers/index.js";
import {
  createEggRequestValidator,
  updateEggRequestValidator,
} from "../validators/index.js";
import { CreateEggRequestDto, UpdateEggRequestDto } from "../dtos/index.js";
import { ValidateRequest } from "../middleware/validate-request.middleware.js";

const eggRouter = Router();

eggRouter.post("/",ValidateRequest.with(createEggRequestValidator, CreateEggRequestDto), EggController.create);

eggRouter.get("/", EggController.showAll);

eggRouter.get("/:id", EggController.get);

eggRouter.patch("/", EggController.update);

eggRouter.delete("/", EggController.delete);

export default eggRouter;
