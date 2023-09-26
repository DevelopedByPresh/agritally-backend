const User = require("../data/models/user.model");
const bcryptHelper = require("../lib/bcrypt");

class UserService {
  async register(userDTO) {
    const newUser = new User(userDTO);
    const savedUser = await newUser.save();
    return savedUser;
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user || !(await bcryptHelper.compare(password, user.password))) {
      return null;
    }

    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async updateUserProfile(userId, updates) {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    return updatedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  }
}

module.exports = new UserService();
