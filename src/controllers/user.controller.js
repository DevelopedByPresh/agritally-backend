import { handleError } from "../middleware/errorHandler.middleware.js";
import userService from "../services/user.Service.js";

class UserController {
  register = async (req, res) => {
    try {
      const user = await userService.register(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  };

  login = async (req, res) => {
    try {
      const user = await userService.login(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  };

  getOne = async (req, res) => {
    try {
      const user = await userService.getOne(req.params.id);
      res.json(user);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  };

  getAll = async (req, res) => {
    try {
      const users = await userService.getAll();

      res.json(users);
    } catch (error) {
      return handleError(error, res);
    }
  };

  async updateProfile(req, res) {
    try {
      const user = await userService.updateOne(req.params, req.body);

      res.json(user);
    } catch (error) {
      return handleError(error, res);
    }
  }

  deleteUser = async (req, res) => {
    try {
      const user = await userService.deleteUser(req.params.id);

      res.json(user);
    } catch (error) {
      return handleError(error, res);
    }
  };
}

export const userController = new UserController();
