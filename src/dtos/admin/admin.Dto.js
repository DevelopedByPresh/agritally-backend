 class AdminDTO {
  constructor({ id, email, firstName, lastName, password, role, date_of_birth, phone, createdAt, updatedAt, token}) {
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

  static from(adminEntity) {
    return new AdminDTO({
      id: adminEntity.id,
      email: adminEntity.email,
      firstName: adminEntity.firstName,
      lastName: adminEntity.lastName,
      date_of_birth: adminEntity.date_of_birth,
      phone: adminEntity.phone,
      role: adminEntity.role,
      token: adminEntity.token,
      createdAt: adminEntity.createdAt,
      updatedAt: adminEntity.updatedAt
    });
  }
  
  
}


// TODO: Create editable field

export default AdminDTO;
