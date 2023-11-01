import Joi from 'joi';
import {
  objectIdSchema,
} from "./lib/common-schema.js";
import { ValidationException } from '../utils/exceptions/validation.exception.js';

export class OrderValidator {
  validateOrder(order) {
    const schema = Joi.object({
      user: objectIdSchema.required(),
      cartId: objectIdSchema.required(),
      total: Joi.number(),
      status: Joi.string().valid('Approved', 'Pending').default('Pending'),
    });

    const { error } = schema.validate(order);

    if (error) {
      throw new ValidationException(error.message);
    }
  }

  validateUpdateOrder(order) {
    const schema = Joi.object({
      user: objectIdSchema.required(),
      total: Joi.number(), 
      status: Joi.string().valid('Approved', 'Pending'),
    });

    const { error } = schema.validate(order);

    if (error) {
      throw new ValidationException(error.message);
    }
  }
}

export const orderValidator = new OrderValidator();
