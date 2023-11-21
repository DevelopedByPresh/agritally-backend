import Joi from "joi";
import { objectIdSchema } from "./lib/common-schema.js";

const categorySchema = Joi.string().valid(
  "Boar",
  "Dry Sows",
  "In-pigs",
  "farrow-pigs",
  "Growers",
  "Weaners",
  "Piglets"
);

export const createPigRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label("User ID"),
    category: categorySchema.required().label("Category"),
    pen: Joi.number().valid(1, 2, 3, 4).required().label("Pen"),
    room: Joi.number().required().label("Room"),
    quantity: Joi.number().required().label("Quantity"),
    mortality: Joi.number().default(0).label("Mortality"),
  }),
});

export const updatePigRequestValidator = Joi.object({
  body: Joi.object({
    category: categorySchema.label("Category"),
    pen: Joi.number().valid(1, 2, 3, 4).label("Pen"),
    room: Joi.number().label("Room"),
    quantity: Joi.number().label("Quantity"),
    mortality: Joi.number().label("Mortality"),
  }),
  params: Joi.object({
    id: objectIdSchema.label("Pig ID").required(),
  }),
});
