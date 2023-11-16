export class UserResponseDTO {
    constructor({
      id,
      email,
      firstName,
      lastName,
      password,
      date_of_birth,
      phone,
      role,
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
      date_of_birth,
      phone,
      role,
      createdAt,
      updatedAt,
    }) {
      return new UserResponseDTO({
        id,
        email,
        firstName,
        lastName,
        password,
        date_of_birth,
        phone,
        role,
        createdAt,
        updatedAt,
      });
    }
  
  static fromMany(users) {
      return users.map((user) => UserResponseDTO.from(user));
    }
  }
  