import { Router } from "express";

import { FishController } from "../controllers/index.js";
import {
  createFishRequestValidator,
  updateFishRequestValidator,
} from "../validators/index.js";
import { CreateFishRequestDto, UpdateFishRequestDto } from "../dtos/index.js";
import { ADMIN_ROLE } from "../utils/helpers/admin.helpers.js";
import { authorizeRoles, auth, ValidateRequest } from "../middleware/index.js";
import { idValidator } from "../validators/lib/common-validators.js";

const fishRouter = Router();
const { MANAGER, OWNER, SUPERADMIN } = ADMIN_ROLE;

fishRouter.post(
  "/",
  auth,
  ValidateRequest.with(createFishRequestValidator, CreateFishRequestDto),
  FishController.create
);

fishRouter.get("/", auth, FishController.showAll);

// fishRouter.get(
//   "/statistics",
//   auth,
//   authorizeRoles(MANAGER, OWNER, SUPERADMIN),
//   FishController.statistics
// );

fishRouter.get("/:id", auth, ValidateRequest.with(idValidator), FishController.get);

fishRouter.patch(
  "/:id",
  auth,
  authorizeRoles(MANAGER, OWNER, SUPERADMIN),
  ValidateRequest.with(updateFishRequestValidator, UpdateFishRequestDto),
  FishController.update
);

fishRouter.delete("/:id", auth, authorizeRoles(MANAGER, OWNER, SUPERADMIN), FishController.delete);

export default fishRouter;
