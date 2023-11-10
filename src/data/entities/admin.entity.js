import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";
import bcrypt from "bcrypt";

export class AdminEntity {
  constructor({
    id,
    firstName,
    lastName,
    email,
    password,
    phone,
    date_of_birth,
    role,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.date_of_birth = date_of_birth;
    this.role = role;
  }

  static make({
    _id,
    firstName,
    lastName,
    email,
    password,
    phone,
    date_of_birth,
    role,
  }) {
    if (_id && !Id.isValidId(_id)) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        id: 'Admin must have a valid id',
      });
    }

    if (!firstName) {
      throw aValidationException(messages.EXCEPTIONS.VALIDATION, {
        firstName: 'Admin must have a first name',
      });
    }

    if (!lastName) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        lastName: 'Admin must have a last name',
      });
    }

    if (!email) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        email: 'Admin must have an email',
      });
    }

    if (!password) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        password: 'Admin must have a password',
      });
    }

    if (!phone) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        phone: 'Admin must have a phone number',
      });
    }

    if (!date_of_birth) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        date_of_birth: 'Admin must have a date of birth',
      });
    }

    return this.#create({
      id: _id,
      firstName,
      lastName,
      email,
      password,
      phone,
      date_of_birth,
      role,
    });
  }

  static #create({
    firstName,
    lastName,
    email,
    password,
    phone,
    date_of_birth,
    role,
    id = Id.makeId(),
  }) {
    // Hash the password before creating the entity.
    const hashedPassword = bcrypt.hashSync(password, 10);

    return new AdminEntity({
      id,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      date_of_birth,
      role,
    });
  }
}
