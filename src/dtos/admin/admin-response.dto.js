export class AdminResponseDTO {
  constructor({
    id,
    email,
    firstName,
    lastName,
    password,
    role,
    date_of_birth,
    phone,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.date_of_birth = date_of_birth;
    this.phone = phone;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    email,
    firstName,
    lastName,
    password,
    role,
    date_of_birth,
    phone,
    createdAt,
    updatedAt,
  }) {
    return new AdminResponseDTO({
      id,
      email,
      firstName,
      lastName,
      password,
      role,
      date_of_birth,
      phone,
      createdAt,
      updatedAt,
    });
  }

static fromMany(admins) {
    return admins.map((admin) => AdminResponseDTO.from(admin));
  }
}
