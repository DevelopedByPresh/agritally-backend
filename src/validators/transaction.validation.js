import Joi from "joi";
import { ValidationException } from "../utils/exceptions/index.js";

const objectIdSchema = Joi.string().hex().messages({
  "string.hex": "Invalid object ID format",
});

const transactionTypeSchema = Joi.string()
  .valid("Purchase", "Sale", "Mortality")
  .required()
  .messages({
    "any.only": "Transaction type must be 'Purchase', 'Sale', or 'Mortality'",
    "any.required": "Transaction type is required",
  });

const amountSchema = Joi.number().min(0).required().messages({
  "number.min": "Amount should be at least 0",
  "any.required": "Amount is required",
});

export function validateTransaction(transaction) {
  const schema = Joi.object({
    orderId: objectIdSchema.required().messages({
      "any.required": "Order ID is required",
    }),
    type: transactionTypeSchema,
    amount: amountSchema,
  });

  const { error } = schema.validate(transaction);

  if (error) {
    throw new ValidationException(error.message);
  }
}

export function updateTransactionValidator(transaction) {
  const schema = Joi.object({
    orderId: objectIdSchema,
    type: transactionTypeSchema,
    amount: amountSchema,
  });

  const { error } = schema.validate(transaction);

  if (error) {
    throw new ValidationException(error.message);
  }
}
