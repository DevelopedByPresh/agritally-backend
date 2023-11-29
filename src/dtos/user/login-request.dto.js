export class LoginUserRequestDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  static from({ email, password }) {
    return new LoginUserRequestDto({ email, password });
  }
}
