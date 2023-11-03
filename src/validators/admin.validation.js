import Joi from "joi";

import { ADMIN_ROLE_ENUM } from "../utils/helpers/admin.helpers.js";
import {
  nameSchema,
  emailSchema,
  phoneSchema,
  objectIdSchema,
} from "./lib/common-schema.js";

export const createAdminRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    email: emailSchema.required(),
    password: Joi.string().min(6).required(),
    phone: phoneSchema.required(),
    date_of_birth: Joi.string().required(),
    role: Joi.string()
      .valid(...ADMIN_ROLE_ENUM)
      .label("Role"),
  }),
});

export const updateAdminRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    phone: phoneSchema.required(),
    date_of_birth: Joi.string().required(),
  }),
  params: Joi.object({
    id: objectIdSchema.label("Admin ID").required(),
  }),
});
