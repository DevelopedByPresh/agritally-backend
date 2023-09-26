const Joi = require("joi");
const { ValidationException } = require("../utils/exceptions/index");

class ProductValidator {
  constructor() {
    this.objectIdSchema = Joi.string().hex().messages({
      "string.hex": "Invalid object ID format",
    });

    this.sectionSchema = Joi.string()
      .valid(
        "Fingerlings",
        "Mature",
        "Big",
        "Small",
        "Boar",
        "Dry Sows",
        "In-pigs",
        "Growers",
        "Weaners",
        "Piglets",
        "Layers",
        "Broilers"
      )
      .required()
      .messages({
        "any.only": "Section must be a valid option for the selected category",
        "any.required": "Section is required",
      });

    this.quantitySchema = Joi.number().integer().min(1).required().messages({
      "number.integer": "Quantity should be a whole number",
      "number.min": "Quantity should be at least 1",
      "any.required": "Quantity is required",
    });
  }

  validateProduct(product) {
    const schema = Joi.object({
      user: this.objectIdSchema.required().messages({
        "any.required": "User is required",
      }),
      category: Joi.string()
        .valid("Cat-fish", "Egg", "Pig", "Poultry")
        .required()
        .messages({
          "any.only": "Category must be a valid option",
          "any.required": "Category is required",
        }),
      section: this.sectionSchema,
      date: Joi.date().default(() => new Date()),
      quantity: this.quantitySchema,
      weight: Joi.string(),
      price: Joi.number().min(0).required().messages({
        "number.min": "Price should be at least 0",
        "any.required": "Price is required",
      }),
      status: Joi.string().valid("Approved", "Pending").default("Pending"),
    });

    const { error } = schema.validate(product);

    if (error) {
      throw new ValidationException(error.message);
    }
  }
}

module.exports = { productValidator: new ProductValidator() };
