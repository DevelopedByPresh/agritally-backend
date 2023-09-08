class UserDTO {
  constructor(id, email, firstName, lastName, password, role, date_of_birth, phone, token) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.date_of_birth = date_of_birth;
    this.phone = phone;
    this.role = role;
  }

  static fromRegister(userEntity) {
    return new UserDTO({
      id: userEntity.id,
      email: userEntity.email,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      date_of_birth: userEntity.date_of_birth,
      phone: userEntity.phone,
      password: userEntity.password,
      role: userEntity.role,
      token: userEntity.token
    });
  }
  
  static fromLogin(payload) {
    const { email, firstName, lastName } = payload;
    return new UserDTO(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.date_of_birth,
      user.phone,
      user.role,
      user.token
    );
  }
}

module.exports = UserDTO;
