import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";

export class PigEntity {
  constructor({
    id,
    category,
    pen,
    room,
  }) {
    this.id = id;
    this.category = category;
    this.pen = pen;
    this.room = room;
  }

  static make({
    _id,
    category,
    pen,
    room,
  }) {
    if (_id && !Id.isValidId(_id)) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        id: "Pig must have a valid id",
      });
    }

    if (!category) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        category: "Pig must have a category",
      });
    }

    if (!pen) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        pen: "Pig must have a pen",
      });
    }

    if (!room) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        room: "Pig must have a room",
      });
    }

    return this.#create({
      id: _id,
      category,
      pen,
      room,
    });
  }

  static #create({
    category,
    pen,
    room,
    id = Id.makeId(),
  }) {
    return new PigEntity({
      id,
      category,
      pen,
      room,
    });
  }
}
