import Joi from "joi";
import {
  nameSchema,
  emailSchema,
  objectIdSchema,
  phoneSchema,
} from "./lib/common-schema.js";

export class UserValidator {
  validateUser(user) {
    const schema = Joi.object({
      firstName: nameSchema.required(),
      lastName: nameSchema.required(),
      email: emailSchema.required(),
      password: passwordSchema.required(),
      phone: phoneSchema.required(),
      date_of_birth: dateOfBirthSchema.required(),
    });

    const { error } = schema.validate(user);

    if (error) {
      throw new ValidationException(error.message);
    }
  }

  validateUpdateUser(user) {
    const schema = Joi.object({
      firstName: nameSchema,
      lastName: nameSchema,
      phone: phoneSchema,
    });

    const { error } = schema.validate(user);

    if (error) {
      throw new ValidationException(error.message);
    }
  }
}

export const userValidator = new UserValidator();
