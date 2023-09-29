import User from "../models/user.model.js";
import bcryptHelper from '../../lib/bcrypt.js';

class UserRepository {
  async save(userDTO) {
    // Hash the password before saving it to the database
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
    // Hash the updated password if it's included in the update
    if (updateDto.password) {
      updateDto.password = await bcryptHelper.hash(updateDto.password);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateDto, {
      new: true,
    });
    return updatedUser;
  }

  async deleteOne(userId) {
    const deletedUser = await User.findByIdAndRemove(userId);
    return deletedUser;
  }

  async getAll() {
    const users = await User.find();
    return users;
  }
}

export default new UserRepository();
