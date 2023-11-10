import { AdminRepository } from "../data/repository/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import { BcryptHelper, jwtService } from "../lib/index.js";
import { AdminResponseDTO } from "../dtos/admin/index.js";

export class AdminService {
  static async register(adminDTO) {
    const existingAdmin = await AdminRepository.findByEmail(adminDTO.email);
    if (existingAdmin) return { message: "Admin already exists" };

    const admin = await AdminRepository.save(adminDTO);

    const accessToken = jwtService.generateAccessToken({
      id: admin.id,
      role: admin.role,
    });


    return {
      message: "Admin Created",
      data: {
        ...AdminResponseDTO.from(user),
        accessToken,
      },
    };
  }

  static async login(loginDto) {
    const { email, password } = loginDto;

    const admin = await AdminRepository.findByEmail(email);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    const isMatch = BcryptHelper.compare(password, admin.password);
    if (!isMatch) {
      throw new NotFoundException("Email or password is incorrect");
    }
    const accessToken = jwtService.generateAccessToken({
      id: admin.id,
      role: admin.role,
    });


    return {
      data: {
        message: "Admin Logged in",
        accessToken,
        ...AdminResponseDTO.from(admin),
      },
    };
  }

  static async getOne(id) {
    const admin = await AdminRepository.findById(id);

    const adminDto = AdminDto.from(admin);

    return {
      message: "Fetched admin",
      data: adminDto,
    };
  }

  static async getAll() {
    const admins = await AdminRepository.getAll();

    return {
      message: "Fetched admins",
      count: admins.length,
      data: admins,
    };
  }

  static async changeUserRole(adminId, changes) {
    const { id } = adminId;
    const updatedAdmin = await AdminRepository.updateOne(id, changes);
    if (!updatedAdmin) {
      throw new NotFoundException("Admin not found");
    }
    const adminDto = AdminDto.from(updatedAdmin);

    return {
      message: "Admin Updated",
      data: adminDto,
    };
  }

  static async updateOne(adminId, changes) {
    const { id } = adminId;
    const updatedAdmin = await AdminRepository.updateOne(id, changes);
    if (!updatedAdmin) {
      throw aNotFoundException("Admin not found");
    }
    const adminDto = AdminDto.from(updatedAdmin);

    return {
      message: "Admin Updated",
      data: adminDto,
    };
  }

  static async deleteAdmin(id) {
    const admin = await AdminRepository.deleteOne(id);

    if (!admin) {
      throw new NotFoundException("User not found");
    }

    return {
      message: "Admin deleted",
    };
  }
}
