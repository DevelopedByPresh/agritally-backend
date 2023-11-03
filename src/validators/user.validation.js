import Joi from "joi";
import {
  nameSchema,
  emailSchema,
  phoneSchema,
} from "./lib/common-schema.js";

export const createUserRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    email: emailSchema.required(),
    password: Joi.string().min(6).required(),
    phone: phoneSchema.required(),
    date_of_birth: Joi.string().required(),
  }),
});

export const updateUserRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    phone: phoneSchema.required(),
    date_of_birth: Joi.string().required(),
  }),
  params: Joi.object({
    id: objectIdSchema.label("User ID").required(),
  }),
});
