import Joi from 'joi';
import { ValidationException } from '../../utils/exceptions/index.js';

export class CatFishValidator {
  #objectIdSchema;
  #sizeSchema;
  #quantitySchema;
  #weightSchema;

  constructor() {
    this.#objectIdSchema = Joi.string().hex().messages({
      'string.hex': 'Invalid object ID format'
    });

    this.#sizeSchema = Joi.string().valid('Fingerlings', 'Mature').required().messages({
      'any.only': 'Size must be either Fingerlings or Mature',
      'any.required': 'Size is required',
    });

    this.#quantitySchema = Joi.number().integer().min(1).required().messages({
      'number.integer': 'Quantity should be a whole number',
      'number.min': 'Quantity should be at least 1',
      'any.required': 'Quantity is required',
    });

    this.#weightSchema = Joi.string().default('0 kg');

    this.#dateSchema = Joi.date().default(Date.now);

  }

  validateCatFish(catFish) {
    const schema = Joi.object({
      user: this.#objectIdSchema.required().messages({
        'any.required': 'User is required',
      }),
      size: this.#sizeSchema,
      date: this.#dateSchema,
      quantity: this.#quantitySchema,
      weight: this.#weightSchema,
    });

    const { error } = schema.validate(catFish);

    if (error) {
      throw new ValidationException('CatFish Validation Error', error.message);
    }
  }
}

export const catFishValidator = new CatFishValidator();
