import Joi from "joi";
import { ValidationException } from "../utils/exceptions/index.js";

class OrderValidator {
  #objectIdSchema;
  #numberSchema;

  constructor() {
    this.#objectIdSchema = Joi.string().hex().messages({
      "string.hex": "Invalid object ID format",
    });

    this.#numberSchema = Joi.number().min(0).messages({
      "number.min": "Value should be at least 0",
      "any.required": "Value is required",
    });
  }

  validateOrder(order) {
    const schema = Joi.object({
      user: this.#objectIdSchema.required().messages({
        "any.required": "User is required",
      }),
      cartId: this.#objectIdSchema.required().messages({
        "any.required": "Cart ID is required",
      }),
      total: this.#numberSchema,
      trackingNo: Joi.string(),
    });

    const { error } = schema.validate(order);

    if (error) {
      throw new ValidationException(error.message);
    }
  }
}

export const orderValidator = new OrderValidator();
