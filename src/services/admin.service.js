import { AdminRepository, UserRepository } from "../data/repository/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import { BcryptHelper, jwtService } from "../lib/index.js";
import { AdminResponseDTO, UserResponseDTO } from "../dtos/index.js";
import { AdminEntity, UserEntity } from "../data/entities/index.js";
import { messages } from "../utils/messages.utils.js";

export class AdminService {
  static async register(createAdminDto) {
    const existingAdmin = await AdminRepository.findByEmail(
      createAdminDto.email
    );
    if (existingAdmin) {
      return { message: messages.AUTH.SIGNUP_ALREADY_EXISTS };
    }

    const adminEntity = AdminEntity.make(createAdminDto);
    const admin = await AdminRepository.save(adminEntity);

    const accessToken = jwtService.generateAccessToken({
      id: admin.id,
      role: admin.role,
    });

    return {
      data: {
        message: messages.COMMON.fn.CREATED('Admin'),
        accessToken,
        ...AdminResponseDTO.from(admin),
      },
    };
  }

  static async login(loginDto) {
    const { email, password } = loginDto;

    const admin = await AdminRepository.findByEmail(email);
    if (!admin) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Admin"));
    }

    const isMatch = BcryptHelper.compare(admin.password, password);
    if (!isMatch) {
      throw new NotFoundException(messages.AUTH.LOGIN_FAILURE);
    }

    const accessToken = jwtService.generateAccessToken({
      id: admin.id,
      role: admin.role,
    });

    return {
      data: {
        message: messages.AUTH.LOGIN_SUCCESS,
        accessToken,
        ...AdminResponseDTO.from(admin),
      },
    };
  }

  static async getOne(id) {
    const admin = await AdminRepository.findById(id);
    if (!admin) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Admin"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Admin"),
      data: AdminResponseDTO.from(admin),
    };
  }

  static async getAll() {
    const admin = await AdminRepository.getAll();
    if (admin.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Admins"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Admins"),
      data: AdminResponseDTO.fromMany(admin),
    };
  }

  static async changeUserRole(id, changes) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("User"));
    }

    const userEntity = UserEntity.make({
      ...user._doc,
      ...changes,
    });

    const updateduser = await UserRepository.updateOne(id, userEntity);
    return {
      message: messages.COMMON.fn.UPDATED("User"),
      data: UserResponseDTO.from(updateduser),
    };
  }

  static async updateOne(id, changes) {
    const admin = await AdminRepository.findById(id);
    if (!admin) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Admin"));
    }

    const adminEntity = AdminEntity.make({
      ...admin._doc,
      ...changes,
    });

    const updatedAdmin = await AdminRepository.updateOne(id, adminEntity);
    return {
      message: messages.COMMON.fn.UPDATED("Admin"),
      data: AdminResponseDTO.from(updatedAdmin),
    };
  }

  static async deleteAdmin(id) {
    const admin = await AdminRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("Admin"),
    };
  }
}
