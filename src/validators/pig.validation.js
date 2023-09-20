import Joi from 'joi';
import { ValidationException } from '../../utils/exceptions/index.js';

export class PigValidator {
  #objectIdSchema;
  #sectionSchema;
  #quantitySchema;
  #weightSchema;

  constructor() {
    this.#objectIdSchema = Joi.string().hex().messages({
      'string.hex': 'Invalid object ID format'
    });

    this.#sectionSchema = Joi.string().valid(
      'Boar',
      'Dry Sows',
      'In-pigs',
      'Growers',
      'Weaners',
      'Piglets'
    ).required().messages({
      'any.only': 'Section must be one of Boar, Dry Sows, In-pigs, Growers, Weaners, Piglets',
      'any.required': 'Section is required',
    });

    this.#quantitySchema = Joi.number().integer().min(1).required().messages({
      'number.integer': 'Quantity should be a whole number',
      'number.min': 'Quantity should be at least 1',
      'any.required': 'Quantity is required',
    });

    this.#weightSchema = Joi.string().default('0 kg');
  }

  validatePig(pig) {
    const schema = Joi.object({
      user: this.#objectIdSchema.required().messages({
        'any.required': 'User is required',
      }),
      section: this.#sectionSchema,
      date: Joi.date().default(() => new Date()),
      quantity: this.#quantitySchema,
      weight: this.#weightSchema,
    });

    const { error } = schema.validate(pig);

    if (error) {
      throw new ValidationException('Pig Validation Error', error.message);
    }
  }
}

export const pigValidator = new PigValidator();
