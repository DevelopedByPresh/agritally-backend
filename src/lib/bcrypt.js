import bcrypt from 'bcrypt';

const saltRounds = 10;

export class BcryptHelper {
  async hash(password) {
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
