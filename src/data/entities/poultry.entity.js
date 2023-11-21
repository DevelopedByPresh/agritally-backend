import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";

export class PoultryEntity {
  constructor({
    id,
    user,
    category,
    date,
    quantity,
    mortality,
    status,
  }) {
    this.id = id;
    this.user = user;
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.mortality = mortality;
    this.status = status;
  }

  static make({
    _id,
    user,
    category,
    date,
    quantity,
    mortality,
    status,
  }) {
    if (_id && !Id.isValidId(_id)) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        id: "Poultry must have a valid id",
      });
    }

    if (!user) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        user: "Poultry must have a user",
      });
    }

    if (!category) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        category: "Poultry must have a category",
      });
    }

    if (!quantity) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        quantity: "Poultry must have a quantity",
      });
    }

    if (!mortality) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        mortality: "Poultry must have a mortality value",
      });
    }

    if (!status) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        status: "Poultry must have a status",
      });
    }

    return this.#create({
      id: _id,
      user,
      category,
      date,
      quantity,
      mortality,
      status,
    });
  }

  static #create({
    user,
    category,
    date,
    quantity,
    mortality,
    status,
    id = Id.makeId(),
  }) {
    return new PoultryEntity({
      id,
      user,
      category,
      date,
      quantity,
      mortality,
      status,
    });
  }
}
