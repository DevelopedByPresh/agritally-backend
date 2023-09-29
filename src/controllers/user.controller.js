import { STATUS_CODE } from "../utils/constants.js";
import { handleError } from "../middleware/errorHandler.middleware.js";
import userService from "../services/user.Service.js";
import UserDto from "../dtos/user/user.Dto.js";
import bcryptHelper from "../lib/bcrypt.js";
import { registerSchema, loginSchema, validate } from "../validators/validation.js";
import { generateJWTToken } from "../lib/jwt.service.js";

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
      const { email, password } = req.body;
      validate({ email, password }, loginSchema);

      const user = await userService.login(email, password);

      if (!user) {
        return res
          .status(STATUS_CODE.UNAUTHORIZED)
          .json({ error: "Incorrect email or password" });
      }

      const { token, expiresIn } = await generateJWTToken({
        id: user.id,
        role: user.role,
      });
      return res
        .status(STATUS_CODE.OK)
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(expiresIn),
        })
        .json({ message: "Login Success", data: user, token, expiresIn });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async getOneUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "User not found" });
      }

      return res.status(STATUS_CODE.OK).json({ data: user });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();

      return res.status(STATUS_CODE.OK).json({ data: users });
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
