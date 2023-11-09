export class CreateUserRequestDTO {
  constructor({ email, firstName, lastName, password, date_of_birth, phone }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.date_of_birth = date_of_birth;
    this.phone = phone;
  }

  static from({ email, firstName, lastName, password, date_of_birth, phone }) {
    return new CreateUserRequestDTO({
      email,
      firstName,
      lastName,
      password,
      date_of_birth,
      phone,
    });
  }
}
