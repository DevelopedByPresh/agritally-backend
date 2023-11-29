import Joi from "joi";
import { objectIdSchema } from "./lib/common-schema.js";
import { PIG_CATEGORIES_ENUM } from "../utils/helpers/pig.helper.js";

const categorySchema = Joi.string().valid(...PIG_CATEGORIES_ENUM);

export const createPigRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label("User ID"),
    category: categorySchema.required().label("Category"),
    pen: Joi.number().valid(1, 2, 3, 4).required().label("Pen"),
    room: Joi.number().required().label("Room"),
    quantity: Joi.number().required().label("Quantity"),
    mortality: Joi.number().default(0).label("Mortality"),
    status: Joi.string().valid('Approved', 'Pending').default('Pending').label('Status'),
  }),
});

export const updatePigRequestValidator = Joi.object({
  body: Joi.object({
    category: categorySchema.label("Category"),
    pen: Joi.number().valid(1, 2, 3, 4).label("Pen"),
    room: Joi.number().label("Room"),
    quantity: Joi.number().label("Quantity"),
    mortality: Joi.number().label("Mortality"),
    status: Joi.string().valid("Approved", "Pending").label("Status"),
  }),
  params: Joi.object({
    id: objectIdSchema.label("Pig ID").required(),
  }),
});
