import Joi from "joi";
import {
  nameSchema,
  emailSchema,
  phoneSchema,
  objectIdSchema
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

export const loginUserRequestValidator = Joi.object({
  body: Joi.object({
    email: emailSchema.required(),
    password: Joi.string().min(6).required(),
  }),
});

export const updateUserRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema,
    lastName: nameSchema,
    phone: phoneSchema,
    date_of_birth: Joi.string(),
    role: Joi.string(),
  }),
  params: Joi.object({
    id: objectIdSchema.label("User ID").required(),
  }),
});
