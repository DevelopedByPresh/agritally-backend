import Joi from "joi";
import { numberSchema, objectIdSchema } from "./lib/common-schema.js";
import {
  POULTRY_CATEGORIES,
  POULTRY_CATEGORIES_ENUM,
} from "../utils/helpers/poultry.helper.js";

const categorySchema = Joi.string().valid(...POULTRY_CATEGORIES_ENUM);

export const createPoultryRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label("User ID"),
    category: categorySchema.required().label("Category"),
    quantity: numberSchema.default(0).required().label("Quantity"),
    mortality: numberSchema.required().label("Mortality"),
    status: Joi.string()
      .valid("Approved", "Pending")
      .default("Pending")
      .label("Status"),
  }),
});

export const updatePoultryRequestValidator = Joi.object({
  body: Joi.object({
    category: categorySchema.required().label("Category"),
    quantity: numberSchema.label("Quantity"),
    mortality: numberSchema.label("Mortality"),
    status: Joi.string().valid("Approved", "Pending").label("Status"),
  }),
  params: Joi.object({
    id: objectIdSchema.required().label("Poultry ID"),
  }),
});
