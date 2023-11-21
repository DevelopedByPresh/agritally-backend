import Joi from "joi";
import { numberSchema, objectIdSchema } from "./lib/common-schema.js";

export const createFishRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label("User ID"),
    breed: Joi.string().required().label("Breed"),
    quantity: numberSchema.required().label("Quantity"),
    price: numberSchema.required().label("Price"),
    weight: Joi.string().label("Weight"),
    status: Joi.string().valid("Approved", "Pending").default("Pending").label("Status"),
  }),
});

export const updateFishRequestValidator = Joi.object({
  body: Joi.object({
    breed: Joi.string().label("Breed"),
    quantity: numberSchema.label("Quantity"),
    price: numberSchema.label("Price"),
    weight: Joi.string().label("Weight"),
    status: Joi.string().valid("Approved", "Pending").label("Status"),
  }),
  params: Joi.object({
    id: objectIdSchema.label("Fish ID").required(),
  }),
});
