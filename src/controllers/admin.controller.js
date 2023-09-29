import { STATUS_CODE } from "../utils/constants.js";
import { handleError } from "../middleware/errorHandler.middleware.js";
import adminService from "../services/admin.service.js"; 

class AdminController {
  async register(req, res) {
    try {
      const admin = await adminService.register(req.body); 
      res.json(admin);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async login(req, res) {
    try {
      const admin = await adminService.login(req.body); 
      res.json(admin);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const admin = await adminService.getOne(req.params.id); 
      res.json(admin);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const admins = await adminService.getAll(); 
      res.json(admins);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async updateProfile(req, res) {
    try {
      const admin = await adminService.updateOne(req.params, req.body); 
      res.json(admin);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async deleteAdmin(req, res) {
    try {
      const admin = await adminService.deleteAdmin(req.params.id); 
      res.json(admin);
    } catch (error) {
      return handleError(error, res);
    }
  }
}

export default new AdminController();
