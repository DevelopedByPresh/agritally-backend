import Joi from 'joi';
import { ValidationException } from '../../utils/exceptions/index.js';

export class EggValidator {
  #objectIdSchema;
  #sizeSchema;
  #quantitySchema;

  constructor() {
    this.#objectIdSchema = Joi.string().hex().messages({
      'string.hex': 'Invalid object ID format'
    });

    this.#sizeSchema = Joi.string().valid('Big', 'Small').required().messages({
      'any.only': 'Size must be either Big or Small',
      'any.required': 'Size is required',
    });

    this.#quantitySchema = Joi.number().integer().min(1).required().messages({
      'number.integer': 'Quantity should be a whole number',
      'number.min': 'Quantity should be at least 1',
      'any.required': 'Quantity is required',
    });
  }

  validateEgg(egg) {
    const schema = Joi.object({
      user: this.#objectIdSchema.required().messages({
        'any.required': 'User is required',
      }),
      size: this.#sizeSchema,
      date: Joi.date().default(() => new Date()),
      quantity: this.#quantitySchema,
    });

    const { error } = schema.validate(egg);

    if (error) {
      throw new ValidationException('Egg Validation Error', error.message);
    }
  }
}

export const eggValidator = new EggValidator();
