import { User } from "../models/index.js";
import bcryptHelper from "../../lib/bcrypt.js";

export class UserRepository {
  static async save(userDTO) {
    const hashedPassword = await bcryptHelper.hash(userDTO.password);
    userDTO.password = hashedPassword;

    const newUser = new User(userDTO);
    const savedUser = await newUser.save();
    return savedUser;
  }

  static async getAll() {
    return User.find();
  }

  static async findById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  static async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  static async updateOne(userId, updateDto) {
    const updatedUser = await User.findByIdAndUpdate(userId, updateDto, {
      new: true,
    });
    return updatedUser;
  }

  static async deleteOne(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }
}
