import Joi from 'joi';
import { ValidationException } from '../../utils/exceptions/index.js';

export class UserValidator {
  #nameSchema;
  #emailSchema;
  #passwordSchema;
  #phoneSchema;
  #dateOfBirthSchema;

  constructor() {
    this.#nameSchema = Joi.string().trim().required().messages({
      'string.empty': 'Name is required',
    });

    this.#emailSchema = Joi.string().email().required().trim().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is required',
    });

    this.#passwordSchema = Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
    });

    this.#phoneSchema = Joi.string().min(10).required().messages({
      'string.min': 'Phone number should be at least 10 digits long',
      'string.empty': 'Phone number is required',
    });

    this.#dateOfBirthSchema = Joi.string().required().messages({
      'string.empty': 'Date of birth is required',
    });
  }

  validateUser(user) {
    const schema = Joi.object({
      firstName: this.#nameSchema,
      lastName: this.#nameSchema,
      email: this.#emailSchema,
      password: this.#passwordSchema,
      phone: this.#phoneSchema,
      date_of_birth: this.#dateOfBirthSchema,
    });

    const { error } = schema.validate(user);

    if (error) {
      throw new ValidationException('User Validation Error', error.message);
    }
  }
}

export const userValidator = new UserValidator();
