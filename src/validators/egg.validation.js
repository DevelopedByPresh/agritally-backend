import Joi from "joi";

import { numberSchema, objectIdSchema } from "./lib/common-schema.js";
import { EGG_CATEGORIES_ENUM } from "../utils/helpers/egg.helper.js";

const categorySchema = Joi.string()
  .valid(...EGG_CATEGORIES_ENUM)
  .required();

export const createEggRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label("User ID"),
    category: categorySchema.label("category"),
    penNumber: numberSchema.required().label("Pen Number"),
    totalBirdHoused: numberSchema.label("Total Bird Housed"),
    ageHoused: numberSchema.label("Age Housed"),
    openingBalance: numberSchema.label("Opening Balance"),
    mortality: numberSchema.default(0).label("Mortality"),
    culls: numberSchema.label("Culls"),
    closingBalance: numberSchema.label("Closing Balance"),
    waterConsumption: numberSchema.required().label("Water Consumption"),
    feedConsumption: numberSchema.required().label("Feed Consumption"),
    eggCollection: Joi.object({
      firstTray: numberSchema.required().label("First Tray"),
      secondTray: numberSchema.required().label("Second Tray"),
      thirdTray: numberSchema.required().label("Third Tray"),
      cracks: numberSchema.required().label("Cracks"),
      total: numberSchema.label("Total"),
      production: numberSchema.label("Production"),
    })
      .required()
      .label("Egg Collection"),
    status: Joi.string().valid('Approved', 'Pending').default('Pending').label('Status'),
    remark: Joi.string().label("Remark"),
  }),
});

export const updateEggRequestValidator = Joi.object({
  body: Joi.object({
    category: categorySchema.label("category"),
    penNumber: numberSchema.label("Pen Number"),
    totalBirdHoused: numberSchema.label("Total Bird Housed"),
    ageHoused: numberSchema.label("Age Housed"),
    openingBalance: numberSchema.label("Opening Balance"),
    mortality: numberSchema.label("Mortality"),
    culls: numberSchema.label("Culls"),
    closingBalance: numberSchema.label("Closing Balance"),
    waterConsumption: numberSchema.label("Water Consumption"),
    feedConsumption: numberSchema.label("Feed Consumption"),
    eggCollection: Joi.object({
      firstTray: numberSchema.label("First Tray"),
      secondTray: numberSchema.label("Second Tray"),
      thirdTray: numberSchema.label("Third Tray"),
      cracks: numberSchema.label("Cracks"),
      total: numberSchema.label("Total"),
      production: numberSchema.label("Production"),
    }).label("Egg Collection"),
    status: Joi.string().valid("Approved", "Pending").label("Status"),
    remark: Joi.string().label("Remark"),
  }),
  params: Joi.object({
    id: objectIdSchema.label("Egg ID").required(),
  }),
});
