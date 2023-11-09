import Joi from 'joi';
import { objectIdSchema } from './lib/common-schema.js';

const cartItemSchema = Joi.object({
  productId: objectIdSchema.required().label('Product ID'),
  price: Joi.number().label('Price'),
  quantity: Joi.number().default(1).label('Quantity'),
  subtotal: Joi.number().label('Subtotal'),
}).label('Cart Item');

export const createCartRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.required().label('User ID'),
    cartItems: Joi.array().items(cartItemSchema).label('Cart Items'),
    active: Joi.boolean().default(true).label('Active'),
    total: Joi.number().label('Total'),
  }),
});

export const updateCartRequestValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.label('User ID'),
    cartItems: Joi.array().items(cartItemSchema).label('Cart Items'),
    active: Joi.boolean().label('Active'),
    total: Joi.number().label('Total'),
  }),
  params: Joi.object({
    id: objectIdSchema.label('Cart ID').required(),
  }),
});
