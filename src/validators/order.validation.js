import Joi from 'joi';

// Define schemas for subfields if needed
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const statusSchema = Joi.string().valid('Approved', 'Pending');

export const createOrderValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.label('User ID').required(),
    cartId: objectIdSchema.label('Cart ID').required(),
    total: Joi.number().label('Total'),
    status: statusSchema.label('Status').default('Pending'),
  }),
});

export const updateOrderValidator = Joi.object({
  body: Joi.object({
    user: objectIdSchema.label('User ID'),
    cartId: objectIdSchema.label('Cart ID'),
    total: Joi.number().label('Total'),
    status: statusSchema.label('Status'),
  }),
  params: Joi.object({
    id: objectIdSchema.label('Product ID').required(),
  }),
});

