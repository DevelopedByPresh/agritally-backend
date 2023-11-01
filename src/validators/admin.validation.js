import Joi from 'joi';
import { ValidationException } from '../utils/exceptions/index.js';
import { ADMIN_ROLE_ENUM } from '../utils/helpers/admin.helpers.js';
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  dateOfBirthSchema,
} from './lib/common-schema.js';

export class AdminValidator {
  validateAdmin(admin) {
    const schema = Joi.object({
      firstName: nameSchema.required(),
      lastName: nameSchema.required(),
      email: emailSchema.required(),
      password: passwordSchema.required(),
      phone: phoneSchema.required(),
      date_of_birth: dateOfBirthSchema.required(),
      role: Joi.string()
        .valid(...ADMIN_ROLE_ENUM)
        .label('Role'),
    });

    const { error } = schema.validate(admin);

    if (error) {
      throw new ValidationException(error.message);
    }
  }

  validateUpdateAdmin(admin) {
    const schema = Joi.object({
      firstName: nameSchema,
      lastName: nameSchema,
      phone: phoneSchema,
      date_of_birth: dateOfBirthSchema,
      role: Joi.string()
        .valid(...ADMIN_ROLE_ENUM)
        .label('Role'),
    });

    const { error } = schema.validate(admin);

    if (error) {
      throw new ValidationException(error.message);
    }
  }
}

export const adminValidator = new AdminValidator();
