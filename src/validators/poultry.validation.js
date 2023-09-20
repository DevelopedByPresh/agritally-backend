import Joi from 'joi';
import { ValidationException } from '../../utils/exceptions/index.js';

export class PoultryValidator {
  #objectIdSchema;
  #sectionSchema;
  #quantitySchema;

  constructor() {
    this.#objectIdSchema = Joi.string().hex().messages({
      'string.hex': 'Invalid object ID format'
    });

    this.#sectionSchema = Joi.string().valid('Layers', 'Broilers').required().messages({
      'any.only': 'Section must be either Layers or Broilers',
      'any.required': 'Section is required',
    });

    this.#quantitySchema = Joi.number().integer().min(1).required().messages({
      'number.integer': 'Quantity should be a whole number',
      'number.min': 'Quantity should be at least 1',
      'any.required': 'Quantity is required',
    });
  }

  validatePoultry(poultry) {
    const schema = Joi.object({
      user: this.#objectIdSchema.required().messages({
        'any.required': 'User is required',
      }),
      section: this.#sectionSchema,
      date: Joi.date().default(() => new Date()),
      quantity: this.#quantitySchema,
    });

    const { error } = schema.validate(poultry);

    if (error) {
      throw new ValidationException('Poultry Validation Error', error.message);
    }
  }
}

export const poultryValidator = new PoultryValidator();
