// repositories/userRepository.js

const User = require('../domain/user');

class UserRepository {
  constructor() {
    this.users = [];
  }

  async addUser(user) {
    this.users.push(user);
    return user;
  }

  async getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async getUserById(id) {
    return this.users.find(user => user.id === id);
  }
}

module.exports = UserRepository;
