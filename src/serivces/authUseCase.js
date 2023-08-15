// usecases/authUseCases.js

const bcrypt = require('bcrypt');
const User = require('../domain/user');
const UserRepository = require('../data/repositories/userRepository');

class AuthUseCases {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(Date.now().toString(), email, hashedPassword, name);
    await this.userRepository.addUser(user);
    return user;
  }

  async loginUser(email, password) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email/password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email/password');
    }

    return user;
  }
}

module.exports = AuthUseCases;
