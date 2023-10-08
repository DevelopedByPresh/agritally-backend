import { STATUS_CODE } from "../utils/constants.js";
import { handleError } from "../middleware/errorHandler.middleware.js";
import {adminService, userService} from "../services/index.js";

class AdminController {
  register = async (req, res) => {
    try {
      const admin = await adminService.register(req.body);
      res.json(admin);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  };

  login = async (req, res) => {
    try {
      const admin = await adminService.login(req.body);
      res.json(admin);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  };

  getOne = async (req, res) => {
    try {
      const admin = await adminService.getOne(req.params.id);
      res.json(admin);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  };

  getAll = async (req, res) => {
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

  async changeUserRole(req, res) {
    try {
      const admin = await adminService.changeUserRole(req.params, req.body);
      res.json(admin);
    } catch (error) {
      return handleError(error, res);
    }
  }

   deleteAdmin = async (req, res) => {
    try {
      const admin = await adminService.deleteAdmin(req.params.id);
      res.json(admin);
    } catch (error) {
      return handleError(error, res);
    }
  }
}

export const adminController = new AdminController()
