
import Admin from "../models/admin.model.js";
import bcryptHelper from '../../lib/bcrypt.js';

class AdminRepository {
  async save(adminDTO) {
    const hashedPassword = await bcryptHelper.hash(adminDTO.password);
    adminDTO.password = hashedPassword;

    const newAdmin = new Admin(adminDTO);
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  }

  async findById(adminId) {
    const admin = await Admin.findById(adminId);
    return admin;
  }

  async findByEmail(email) {
    const admin = await Admin.findOne({ email });
    return admin;
  }

  async updateOne(adminId, updateDto) {
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateDto, {
      new: true,
    });
    return updatedAdmin;
  }

  async deleteOne(id) {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    return deletedAdmin;
  }

  async getAll() {
    const admins = await Admin.find();
    return admins;
  }
}

export default new AdminRepository();
