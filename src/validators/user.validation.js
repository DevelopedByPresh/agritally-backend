import Joi from "joi";

import {
  nameSchema,
  emailSchema,
  objectIdSchema,
  phoneSchema,
} from "./lib/common-schema.js";

export const userRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    email: emailSchema.required(),
    password: nameSchema.required(),
    phone: phoneSchema.required(),
    date_of_birth: nameSchema.required(),
  }),
});

export const updateUserRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    phone: phoneSchema.required(),
    date_of_birth: nameSchema.required(),
  }),
  params: Joi.object({
    id: objectIdSchema.label('User ID').required(),
  }),
});
