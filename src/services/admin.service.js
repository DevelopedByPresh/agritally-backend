import Admin from "../data/models/admin.model.js";
import bcryptHelper from "../lib/bcrypt.js";

export default class AdminService {
  async register(adminDTO) {
    const newAdmin = new Admin(adminDTO);
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  }

  async login(email, password) {
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcryptHelper.compare(password, admin.password))) {
      return null;
    }

    return admin;
  }

  async getAdminByEmail(email) {
    const admin = await Admin.findOne({ email });
    return admin;
  }

  async getAdminById(adminId) {
    console.log("service");
    const admin = await Admin.findById(adminId);
    return admin;
  }

  async getAllAdmins() {
    const admins = await Admin.find();
    return admins;
  }

  async updateAdminProfile(adminId, updates) {
    const updatedadmin = await Admin.findByIdAndUpdate(adminId, updates, {
      new: true,
    });
    return updatedadmin;
  }

  async deleteAdmin(adminId) {
    const deletedadmin = await Admin.findByIdAndDelete(adminId);
    return deletedadmin;
  }
}
