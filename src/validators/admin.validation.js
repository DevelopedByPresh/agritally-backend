import Joi from 'joi';
import { ValidationException } from '../utils/exceptions/index.js';
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  dateOfBirthSchema,
} from './lib/common-schema.js';

const roleSchema = Joi.string().valid('superAdmin', 'owner', 'manager').default('manager');

export class AdminValidator {
  validateAdmin(admin) {
    const schema = Joi.object({
      firstName: nameSchema.required(),
      lastName: nameSchema.required(),
      email: emailSchema.required(),
      password: passwordSchema.required(),
      phone: phoneSchema.required(),
      date_of_birth: dateOfBirthSchema.required(),
      role: roleSchema,
    });

    const { error } = schema.validate(admin);

    if (error) {
      throw new ValidationException(error.message);
    }
  }
}

export const adminValidator = new AdminValidator();
