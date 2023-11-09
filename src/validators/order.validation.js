import Joi from 'joi';
import { objectIdSchema } from './lib/common-schema.js';

export const createOrderRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label('User ID'),
    cartId: objectIdSchema.required().label('Cart ID'),
    total: Joi.number().label('Total'),
    status: Joi.string().valid('Approved', 'Pending').default('Pending').label('Status'),
  }),
});

export const updateOrderRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.label('User ID'),
    cartId: objectIdSchema.label('Cart ID'),
    total: Joi.number().label('Total'),
    status: Joi.string().valid('Approved', 'Pending').label('Status'),
  }),
  params: Joi.object({
    id: objectIdSchema.required().label('Order ID'),
  }),
});
