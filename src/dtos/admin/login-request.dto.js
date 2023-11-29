export class LoginAdminRequestDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  static from({ email, password }) {
    return new LoginAdminRequestDto({ email, password });
  }
}
