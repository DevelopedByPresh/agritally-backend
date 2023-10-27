import { Admin } from "../models/admin.model.js";
import { BcryptHelper } from "../../lib/index.js";

export class AdminRepository {
  static async save(adminDTO) {
    const hashedPassword = await BcryptHelper.hash(adminDTO.password);
    adminDTO.password = hashedPassword;

    const newAdmin = new Admin(adminDTO);
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  }

  static async findById(adminId) {
    const admin = await Admin.findById(adminId);
    return admin;
  }

  static async findByEmail(email) {
    const admin = await Admin.findOne({ email });
    return admin;
  }

  static async updateOne(adminId, updateDto) {
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateDto, {
      new: true,
    });
    return updatedAdmin;
  }

  static async deleteOne(id) {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    return deletedAdmin;
  }

  static async getAll() {
    const admins = await Admin.find();
    return admins;
  }
}
