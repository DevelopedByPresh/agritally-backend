import { STATUS_CODE } from "../utils/constants.js";
import { handleError } from "../middleware/errorHandler.middleware.js";
import userService from "../services/user.Service.js";

class UserController {
  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async login(req, res) {
    try {
      const user = await userService.login(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const user = await userService.getOne(req.params.id);
      res.json(user);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAll();

      res.json(users);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async updateProfile(req, res) {
    try {
      const user = await userService.updateOne(req.params, req.body);

      res.json(user);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);

      res.json(user);
    } catch (error) {
      return handleError(error, res);
    }
  }
}

export default new UserController();
