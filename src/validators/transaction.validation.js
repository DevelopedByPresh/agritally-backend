import Joi from 'joi';
import { objectIdSchema } from './lib/common-schema.js';

const categoryEnum = ['Cat-fish', 'Egg', 'Pig', 'Poultry'];
const sectionEnum = {
  'Cat-fish': ['Fingerlings', 'Mature'],
  'Egg': ['Big', 'Small'],
  'Pig': ['Boar', 'Dry Sows', 'In-pigs', 'Growers', 'Weaners', 'Piglets'],
  'Poultry': ['Broilers', 'Layers'],
};

export const createProductRequestValidator = Joi.object({
  // body: Joi.object({
  //   user: objectIdSchema.required(),
  //   category: Joi.string()
  //     .valid(...categoryEnum)
  //     .required(),
  //   section: Joi.string()
  //     .valid(...sectionEnum[Joi.ref('category')]) 
  //     .required(),
  //   date: Joi.date().iso().required(),
  //   quantity: Joi.number().integer().min(1).required(),
  //   weight: Joi.string(),
  //   price: Joi.number().min(0.01).required(),
  //   status: Joi.string()
  //     .valid('Approved', 'Pending')
  //     .default('Pending'),
  // }),
});

export const updateProductRequestValidator = Joi.object({
  // body: Joi.object({
  //   user: objectIdSchema,
  //   category: Joi.string()
  //     .valid(...categoryEnum),
  //   section: Joi.string()
  //     .valid(...sectionEnum[Joi.ref('category')]),
  //   date: Joi.date(),
  //   quantity: Joi.number().integer().min(1),
  //   weight: Joi.string(),
  //   price: Joi.number().min(0.01),
  //   status: Joi.string()
  //     .valid('Approved', 'Pending'),
  // }),
  params: Joi.object({
    id: objectIdSchema.label('Product ID').required(),
  }),
});
