import { User } from "../data/models/index.js";
import { UserRepository } from "../data/repository/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
// import { userValidator } from "../validators/user.validation.js";
import UserDto from "../dtos/user/user.Dto.js";
import { BcryptHelper } from "../lib/index.js";
import { jwtService } from "../lib/jwt.service.js";

export class UserService {
  static async register(userDTO) {
    // userValidator.validateUser(userDTO);
    const existingUser = await UserRepository.findByEmail(userDTO.email);
    if (existingUser) return { message: "User already exists" };

    const user = await UserRepository.save(userDTO);

    const accessToken = jwtService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    const newUser = UserDto.from(user);

    return {
      message: "User created",
      data: {
        ...newUser,
        accessToken,
      },
    };
  }

  static async login(loginDto) {
    const { email, password } = loginDto;

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isMatch = BcryptHelper.compare(user.password, password);
    if (!isMatch) {
      throw new NotFoundException("Email or password is incorrect");
    }
    const accessToken = jwtService.generateAccessToken({
      id: user.id,
      role: user.role,
    });


    const User = UserDto.from(user);

    return {
      message: "User Login ",
      ...User,
      accessToken
    };
  }

  static async getOne(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const User = UserDto.from(user);

    return {
      message: "Fetched user",
      data: User,
    };
  }

  static async getAll() {
    const user = await UserRepository.getAll();

    return {
      message: "Fetched user",
      count: user.length,
      data: user,
    };
  }

  static async updateOne(userId, changes) {
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

  static async deleteUser(id) {
    const user = await UserRepository.deleteOne(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      message: "User deleted",
    };
  }
}
