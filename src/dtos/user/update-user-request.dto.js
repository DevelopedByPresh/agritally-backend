export class UpdateUserRequestDTO {
  constructor({
    email,
    firstName,
    lastName,
    password,
    role,
    date_of_birth,
    phone,
  }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.date_of_birth = date_of_birth;
    this.phone = phone;
    this.role = role;
    this.updatedAt = new Date();
  }

  static from({
    email,
    firstName,
    lastName,
    password,
    role,
    date_of_birth,
    phone,
  }) {
    return new UpdateUserRequestDTO({
      email,
      firstName,
      lastName,
      password,
      role,
      date_of_birth,
      phone,
    });
  }
}
