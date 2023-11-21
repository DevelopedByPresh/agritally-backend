import Joi from "joi";
import { numberSchema, objectIdSchema } from "./lib/common-schema.js";

export const createPoultryRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label("User ID"),
    category: Joi.string().valid("Layers", "Broilers").required().label("Category"),
    date: Joi.date().default(new Date()).label("Date"),
    quantity: numberSchema.default(0).required().label("Quantity"),
    mortality: numberSchema.required().label("Mortality"),
    status: Joi.string().valid("Approved", "Pending").default("Pending").label("Status"),
  }),
});

export const updatePoultryRequestValidator = Joi.object({
  body: Joi.object({
    category: Joi.string().valid("Layers", "Broilers").label("Category"),
    date: Joi.date().label("Date"),
    quantity: numberSchema.label("Quantity"),
    mortality: numberSchema.label("Mortality"),
    status: Joi.string().valid("Approved", "Pending").label("Status"),
  }),
  params: Joi.object({
    id: objectIdSchema.required().label("Poultry ID"),
  }),
});
