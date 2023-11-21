import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";

export class CartEntity {
  constructor({ id, user, cartItems, active, total }) {
    this.id = id;
    this.user = user;
    this.cartItems = cartItems;
    this.active = active;
    this.total = total;
  }

  static make({ _id, user, cartItems, active, total }) {
    if (_id && !Id.isValidId(_id)) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        id: "Cart must have a valid id",
      });
    }

    if (!user) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        user: "Cart must have a user",
      });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        cartItems: "Cart must have at least one item",
      });
    }


    return this.#create({
      id: _id,
      user,
      cartItems,
      active,
      total,
    });
  }

  static #create({
    user,
    cartItems = [],
    active = true,
    total,
    id = Id.makeId(),
  }) {
    return new CartEntity({
      id,
      user,
      cartItems,
      active,
      total,
    });
  }
}
