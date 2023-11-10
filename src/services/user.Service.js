import { UserRepository } from "../data/repository/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import { BcryptHelper, jwtService } from "../lib/index.js";
import { UserResponseDTO } from "../dtos/user/index.js";
import { UserEntity } from "../data/entities/index.js";
import { messages } from "../utils/messages.utils.js";

export class UserService {
  static async register(createUserDto) {
    const existingUser = await UserRepository.findByEmail(createUserDto.email);
    if (existingUser) return { message: messages.AUTH.SIGNUP_ALREADY_EXISTS };

    const userEntity = UserEntity.make(createUserDto);
    const user = await UserRepository.save(userEntity);

    const accessToken = jwtService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    return {
      message: messages.COMMON.fn.CREATED,
      data: {
        accessToken,
        ...UserResponseDTO.from(user),
      },
    };
  }

  static async login(loginDto) {
    const { email, password } = loginDto;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("User"));
    }

    const isMatch = BcryptHelper.compare(user.password, password);
    if (!isMatch) {
      throw new NotFoundException(messages.AUTH.LOGIN_FAILURE);
    }
    const accessToken = jwtService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    return {
      message: messages.AUTH.LOGIN_SUCCESS,
      data: { accessToken, ...UserResponseDTO.from(user) },
    };
  }

  static async getOne(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("User"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("User"),
      data: UserResponseDTO.from(user),
    };
  }

  static async getAll() {
    const user = await UserRepository.getAll();
    if (user.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("User"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Users"),
      data: UserResponseDTO.fromMany(user),
    };
  }

  static async updateOne(id, changes) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("User"));
    }

    const userEntity = UserEntity.make({
      ...user._doc,
      ...changes,
    });

    const updatedUser = await UserRepository.updateOne(id, userEntity);
    return {
      message: messages.COMMON.fn.UPDATED("User"),
      data: UserResponseDTO.from(updatedUser),
    };
  }

  static async deleteUser(id) {
    const user = await UserRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("User"),
    };
  }
}
