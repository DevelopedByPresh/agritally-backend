import User from "../models/user.model.js";
import bcryptHelper from '../../lib/bcrypt.js';

class UserRepository {
  async save(userDTO) {
    const hashedPassword = await bcryptHelper.hash(userDTO.password);
    userDTO.password = hashedPassword;

    const newUser = new User(userDTO);
    const savedUser = await newUser.save();
    return savedUser;
  }

  async findById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async updateOne(userId, updateDto) {
    const updatedUser = await User.findByIdAndUpdate(userId, updateDto, {
      new: true,
    });
    return updatedUser;
  }

  async deleteOne(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }

  async getAll() {
    const users = await User.find();
    return users;
  }
}

export default new UserRepository();
