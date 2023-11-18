export class UpdateUserRequestDTO {
  constructor({
    email,
    firstName,
    lastName,
    date_of_birth,
    phone,
    role
  }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.date_of_birth = date_of_birth;
    this.phone = phone;
    this.role = role;
    this.updatedAt = new Date();
  }

  static from({
    email,
    firstName,
    lastName,
    date_of_birth,
    phone,
    role,
  }) {
    return new UpdateUserRequestDTO({
      email,
      firstName,
      lastName,
      date_of_birth,
      phone,
      role,
    });
  }
}
