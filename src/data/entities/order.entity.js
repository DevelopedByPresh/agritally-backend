import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";

export class OrderEntity {
  constructor({ id, user, cartId, total, status }) {
    this.id = id;
    this.user = user;
    this.cartId = cartId;
    this.total = total;
    this.status = status;
  }

  static make({ _id, user, cartId, total, status }) {
    if (_id && !Id.isValidId(_id)) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        id: "Order must have a valid id",
      });
    }

    if (!user) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        user: "Order must have a User",
      });
    }

    if (!cartId) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        cartId: "Order must have a Cart",
      });
    }


    return this.#create({
        user,
        cartId,
        total,
        status,
        id: Id.makeId()
    });
  }

  static #create({ id, user, cartId, total, status}) {
    return new OrderEntity({
      id,
      user,
      cartId,
      total,
      status,
    });
  }
}
