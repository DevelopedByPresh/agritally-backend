import Joi from 'joi';
import { numberSchema, objectIdSchema } from './lib/common-schema.js';

export const createTransactionValidator = Joi.object({
  body: Joi.object({
    orderId: objectIdSchema.required().label('Order ID'),
    type: Joi.string().valid('Purchase', 'Sale', 'Mortality').required().label('Type'),
    amount: numberSchema.required().label('Amount'),
    date: Joi.date().default(new Date()).label('Date'),
  }),
});

export const updateTransactionValidator = Joi.object({
  body: Joi.object({
    orderId: objectIdSchema.label('Order ID'),
    type: Joi.string().valid('Purchase', 'Sale', 'Mortality').label('Type'),
    amount: numberSchema.label('Amount'),
    date: Joi.date().label('Date'),
  }),
  params: Joi.object({
    id: objectIdSchema.label('Transaction ID').required(),
  }),
});
