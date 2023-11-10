import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";

export class ProductEntity {
    constructor({
      id,
      user,
      category,
      section,
      date,
      quantity,
      weight,
      price,
      status,
    }) {
      this.id = id;
      this.user = user;
      this.category = category;
      this.section = section;
      this.date = date;
      this.quantity = quantity;
      this.weight = weight;
      this.price = price;
      this.status = status;
    }
  
    static make({
      _id,
      user,
      category,
      section,
      date,
      quantity,
      weight,
      price,
      status,
    }) {
      if (_id && !Id.isValidId(_id)) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          id: 'Product must have a valid id',
        });
      }
  
      if (!user) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          user: 'Product must be associated with a user',
        });
      }
  
      if (!category || !["Cat-fish", "Egg", "Pig", "Poultry"].includes(category)) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          category: 'Product must have a valid category',
        });
      }
  
      if (!section) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          section: 'Product must have a section',
        });
      }
  
      const allowedSections = {
        "Cat-fish": ["Fingerlings", "Mature"],
        "Egg": ["Big", "Small"],
        "Pig": ["Boar", "Dry Sows", "In-pigs", "Growers", "Weaners", "Piglets"],
        "Poultry": ["Broilers", "Layers"],
      };
  
      if (!allowedSections[category].includes(section)) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          section: 'Invalid section for the selected category',
        });
      }
  
      if (!date) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          date: 'Product must have a date',
        });
      }
  
      if (!quantity || quantity < 1) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          quantity: 'Product must have a valid quantity',
        });
      }
  
      if (!price || price < 0) {
        throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
          price: 'Product must have a valid price',
        });
      }
  
  
      return this.#create({
        id: _id,
        user,
        category,
        section,
        date,
        quantity,
        weight,
        price,
        status,
      });
    }
  
    static #create({
      user,
      category,
      section,
      date,
      quantity,
      weight,
      price,
      status,
      id = Id.makeId(),
    }) {
      return new ProductEntity({
        id,
        user,
        category,
        section,
        date,
        quantity,
        weight,
        price,
        status,
      });
    }
  }
  