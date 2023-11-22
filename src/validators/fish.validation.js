import Joi from "joi";
import { numberSchema, objectIdSchema } from "./lib/common-schema.js";
import { FISH_CATEGORIES_ENUM } from "../utils/helpers/fish.helper.js";

const categorySchema = Joi.string().valid(...FISH_CATEGORIES_ENUM).required()
export const createFishRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label("User ID"),
    category: categorySchema.label("Breed"),
    quantity: numberSchema.required().label("Quantity"),
    weight: Joi.string().label("Weight"),
    status: Joi.string().valid("Approved", "Pending").default("Pending").label("Status"),
  }),
});

export const updateFishRequestValidator = Joi.object({
  body: Joi.object({
    breed: Joi.string().label("Breed"),
    quantity: numberSchema.label("Quantity"),
    weight: Joi.string().label("Weight"),
    status: Joi.string().valid("Approved", "Pending").label("Status"),
  }),
  params: Joi.object({
    id: objectIdSchema.label("Fish ID").required(),
  }),
});
