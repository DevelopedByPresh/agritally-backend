import Joi from 'joi';
import { objectIdSchema } from './lib/common-schema.js';

const allowedSections = {
  "Cat-fish": ["Fingerlings", "Mature"],
  Egg: ["Big", "Small"],
  Pig: ["Boar", "Dry Sows", "In-pigs", "Growers", "Weaners", "Piglets"],
  Poultry: ["Broilers", "Layers"],
};

export const createProductRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label('User ID'),
    category: Joi.string().valid('Cat-fish', 'Egg', 'Pig', 'Poultry').required().label('Category'),
    section: Joi.string().valid(...allowedSections['Cat-fish'], ...allowedSections['Egg'], ...allowedSections['Pig'], ...allowedSections['Poultry']).required().label('Section'),
    date: Joi.date().default(new Date()).label('Date'),
    quantity: Joi.number().default(1).label('Quantity'),
    weight: Joi.string().label('Weight'),
    price: Joi.number().default(0).label('Price'),
    status: Joi.string().valid('Approved', 'Pending').default('Pending').label('Status'),
  }),
});

export const updateProductRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.label('User ID'),
    category: Joi.string().valid('Cat-fish', 'Egg', 'Pig', 'Poultry').label('Category'),
    section: Joi.string().valid(...allowedSections['Cat-fish'], ...allowedSections['Egg'], ...allowedSections['Pig'], ...allowedSections['Poultry']).label('Section'),
    date: Joi.date().label('Date'),
    quantity: Joi.number().label('Quantity'),
    weight: Joi.string().label('Weight'),
    price: Joi.number().label('Price'),
    status: Joi.string().valid('Approved', 'Pending').label('Status'),
  }),
  params: Joi.object({
    id: objectIdSchema.required().label('Product ID'),
  }),
});
