import User from "../data/models/user.model.js";
import UserRepository from "../data/repository/user.repository.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import { userValidator } from "../validators/user.validation.js";
import UserDto from "../dtos/user/user.Dto.js";
import bcryptHelper from "../lib/bcrypt.js";
import { generateJWTToken, decodeToken } from "../lib/jwt.service.js";

class UserService {
  async register(userDTO) {
    userValidator.validateUser(userDTO);
    const existingUser = await UserRepository.findByEmail(userDTO.email);
    if (existingUser) return { message: "User already exists" };

    const createUser = await UserRepository.save(userDTO);

    const { token, expiresIn } = await generateJWTToken({
      id: createUser.id,
      role: createUser.role,
    });

    const newUser = UserDto.from(createUser);

    return {
      message: "User created",
      data: newUser,
      token,
      expiresIn,
    };
  }

  async login(loginDto) {
    const { email, password } = loginDto;

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isMatch = bcryptHelper.compare(user.password, password);
    if (!isMatch) {
      throw new NotFoundException("Email or password is incorrect");
    }
    const { token, expiresIn } = await generateJWTToken({
      id: user.id,
      role: user.role,
    });

    const User = UserDto.from(user);

    return {
      message: "User Login ",
      data: User,
      token,
      expiresIn,
    };
  }

  async getOne(id) {
    const user = await UserRepository.findById(id);

    const User = UserDto.from(user);

    return {
      message: "Fetched user",
      data: User,
    };
  }

  async getAll() {
    const user = await UserRepository.getAll();

    return {
      message: "Fetched user",
      count: user.length,
      data: user,
    };
  }

  async updateOne(userId, changes) {
    const { id } = userId;
    const updatedUser = await UserRepository.updateOne(id, changes);
    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }
    const userDto = UserDto.from(updatedUser);

    return {
      message: "User Updated",
      data: userDto,
    };
  }

  async deleteUser(id) {
    const user = await UserRepository.deleteOne(id);

    return {
      message: "User deleted",
    };
  }
}

export default new UserService();
