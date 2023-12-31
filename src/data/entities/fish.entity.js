import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";

export class FishEntity {
  constructor({
    id,
    user,
    category,
    date,
    quantity,
    weight,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    this.id = id;
    this.user = user;
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
    this.status = status;
  }

  static make({
    _id,
    user,
    category,
    date,
    quantity,
    weight,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    if (_id && !Id.isValidId(_id)) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        id: "Fish must have a valid id",
      });
    }

    if (!user) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        user: "Fish must have a user",
      });
    }

    if (!category) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        category: "Fish must have a category",
      });
    }

    if (!date) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        date: "Fish must have a date",
      });
    }

    if (!quantity) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        quantity: "Fish must have a quantity",
      });
    }

    return this.#create({
      id: _id,
      user,
      category,
      date,
      quantity,
      weight,
      mortality,
      openingBalance,
      closingBalance,
      status,
    });
  }

  static #create({
    user,
    category,
    date,
    quantity,
    weight,
    mortality,
    openingBalance,
    closingBalance,
    status,
    id = Id.makeId(),
  }) {
    return new FishEntity({
      id,
      user,
      category,
      date,
      quantity,
      weight,
      mortality,
      openingBalance,
      closingBalance,
      status,
    });
  }
}
