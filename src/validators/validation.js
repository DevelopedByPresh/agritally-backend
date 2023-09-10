const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string(),
  password: Joi.string().min(8).required(),
  date_of_birth: Joi.date(),
  phone: Joi.string(),
  role: Joi.string().valid("superAdmin", "manager", "owner").default("manager"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validate(data, schema) {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
}

module.exports = {
  registerSchema,
  loginSchema,
  validate,
};

