import bcrypt from 'bcrypt';

const saltRounds = 10;

export class BcryptHelper {
  static hash = async (password) => {
    return await bcrypt.hash(password, saltRounds);
  }

  static compare = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
}
