import User from "../data/models/user.model.js";
import { STATUS_CODE } from "../utils/constants.js";
import UserRepository from "../data/repository/user.repository.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import { userValidator } from "../validators/user.validation.js";
import UserDto from "../dtos/user/user.Dto.js";
import bcryptHelper from "../lib/bcrypt.js";

class UserService {
  async register(userDTO) {
    userValidator.validateUser(userDTO);
    const existingUser = await UserRepository.findByEmail(userDTO.email);
    if (existingUser) return { message: "User already exists" };

    const createUser = await UserRepository.save(userDTO);

    const newUser = UserDto.fromRegister(createUser);

    return {
      message: "User created",
      data: newUser,
    };
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

export default new UserService();
