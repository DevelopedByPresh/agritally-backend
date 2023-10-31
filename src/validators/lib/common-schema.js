import Joi from "joi";

export const dateOfBirthSchema = Joi.string()
  .trim()
  .label("Date of Birth")
  .max(255)
  .messages({ "string.empty": "Date of birth is required" });

export const descriptionSchema = Joi.string()
  .trim()
  .lowercase()
  .label("Description")
  .max(255)
  .messages({ "string.empty": "Description is required" });

export const emailSchema = Joi.string()
  .label("Email")
  .trim()
  .lowercase()
  .email()
  .max(255)
  .messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  });

export const nameSchema = Joi.string()
  .label("Name")
  .trim()
  .lowercase()
  .min(2)
  .max(30)
  .messages({
    "string.min": "{#label} is too short",
    "string.max": `{#label} is too long`,
  });

export const objectIdSchema = Joi.alternatives(
  Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({ "string.pattern.base": "Invalid object id" }),
  Joi.object().keys({
    id: Joi.any(),
    bsontype: Joi.allow("ObjectId"),
  })
);

export const phoneSchema = Joi.string()
  .trim()
  .label("Phone number")
  .pattern(/^(\+?234|0)(70|[89][01])\d{8}$/)
  .messages({
    "string.pattern.base": "{#label} is not valid",
    "any.required": "{#label} is required",
  });

export const passwordSchema = Joi.string().min(6).required();

export const priceSchema = Joi.number()
  .label("Price")
  .precision(2)
  .min(0.01)
  .max(9999.99);

export const quantitySchema = Joi.number()
  .label("Quantity")
  .integer()
  .min(1)
  .max(9999);

export const totalSchema = Joi.number()
  .label("Total")
  .precision(2)
  .min(0.01)
  .max(9999.99);
