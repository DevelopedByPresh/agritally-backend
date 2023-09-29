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
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = await userService.updateUserProfile(id, updates);

      if (!updatedUser) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "User not found" });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Profile updated", data: updatedUser });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await userService.deleteUser(id);

      if (!deletedUser) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "User not found" });
      }

      return res.status(STATUS_CODE.OK).json({ message: "User deleted" });
    } catch (error) {
      return handleError(error, res);
    }
  }
}

export default new UserController();
