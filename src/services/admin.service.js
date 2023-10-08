import Admin from "../data/models/admin.model.js";
import AdminRepository from "../data/repository/admin.repository.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import { adminValidator } from "../validators/admin.validation.js";
import AdminDto from "../dtos/admin/admin.Dto.js";
import bcryptHelper from "../lib/bcrypt.js";
import { generateJWTToken, decodeToken } from "../lib/jwt.service.js";

class AdminService {
  async register(adminDTO) {
    adminValidator.validateAdmin(adminDTO); 
    const existingAdmin = await AdminRepository.findByEmail(adminDTO.email);
    if (existingAdmin) return { message: "Admin already exists" };

    const createAdmin = await AdminRepository.save(adminDTO);

    const { token, expiresIn } = await generateJWTToken({
      id: createAdmin.id,
      role: createAdmin.role,
    });

    const newAdmin = AdminDto.from(createAdmin);

    return {
      message: "Admin created",
      data: newAdmin,
      token,
      expiresIn,
    };
  }

  async login(loginDto) {
    const { email, password } = loginDto;

    const admin = await AdminRepository.findByEmail(email);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    const isMatch = bcryptHelper.compare(password, admin.password);
    if (!isMatch) {
      throw new NotFoundException("Email or password is incorrect");
    }
    const { token, expiresIn } = await generateJWTToken({
      id: admin.id,
      role: admin.role,
    });

    const adminDto = AdminDto.from(admin);

    return {
      message: "Admin Login",
      data: adminDto,
      token,
      expiresIn,
    };
  }

  async getOne(id) {
    const admin = await AdminRepository.findById(id);

    const adminDto = AdminDto.from(admin);

    return {
      message: "Fetched admin",
      data: adminDto,
    };
  }

  async getAll() {
    const admins = await AdminRepository.getAll();

    return {
      message: "Fetched admins",
      count: admins.length,
      data: admins,
    };
  }

  async changeUserRole(adminId, changes) {
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
  async updateOne(adminId, changes) {
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

  async deleteAdmin(id) {
    const admin = await AdminRepository.deleteOne(id);

    if (!admin) {
      throw new NotFoundException("User not found");
    }

    return {
      message: "Admin deleted",
    };
  }
}

export const adminService = new AdminService();
