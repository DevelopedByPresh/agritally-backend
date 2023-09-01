const { STATUS_CODE } = require("../utils/constants");
const handleError = require("../middleware/errorHandler.middleware");
const UserDto = require("../dtos/userDto/userDTO");
const bcryptHelper = require('../lib/bcrypt');
const authService = require('../services/authService');
const {
  registerSchema,
  loginSchema,
  validate,
} = require("../validators/validation");
const {generateJWTToken, decodeToken} = require("../lib/jwt.service")

class AuthController {
//   async register(req, res) {
//     try {
//       const registerDto = req.body;
//       validate(registerDto, registerSchema);

//       // Check if the user already exists
//       const existingUser = await authService.getUserByEmail(registerDto.email);
//       if (existingUser) {
//         return res
//           .status(STATUS_CODE.BAD_REQUEST)
//           .json({ error: "User already exists" });
//       }

//       const hashedPassword = await bcryptHelper.hash(registerDto.password);
//       const newUser = {
//         ...registerDto,
//         password: hashedPassword,
//       };

//       const createUser = await authService.register(newUser);

//       const { token, expiresIn} = await generateJWTToken({id:createUser.id, role: createUser.role})

//       const userDto = UserDto.fromRegister(createUser);

//       return res
//         .status(STATUS_CODE.CREATED)
//         .cookie('access_token', token, {
//           httpOnly: true,
//           expires: new Date(expiresIn),
//         })
//         .json({ message: "Created successfully", data: userDto, token });
//     } catch (error) {
//       console.log(error)
//       return handleError(error, res);
//     }
//   }

//   async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       validate({ email, password }, loginSchema);

//       const user = await authService.login(email, password);

//       if (!user) {
//         return res
//           .status(STATUS_CODE.UNAUTHORIZED)
//           .json({ error: "Incorrect email or password" });
//       }

//       const { token, expiresIn} = await generateJWTToken({id:user.id, role: user.role})
//       return res
//         .status(STATUS_CODE.OK)
//         .cookie('access_token', token, {
//           httpOnly: true,
//           expires: new Date(expiresIn),
//         })
//         .json({ message: "Login Success", data: user });
//     } catch (error) {
//       return handleError(error, res);
//     }
//   }

  async getOneUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await authService.getUserById(userId);

      if (!user) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "User not found" });
      }

      return res.status(STATUS_CODE.OK).json({ data: user });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await authService.getAllUsers();

      return res.status(STATUS_CODE.OK).json({ data: users });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async updateProfile(req, res) {
    try {
      const { userId } = req.params;
      const updates = req.body;

      const updatedUser = await authService.updateUserProfile(userId, updates);

      if (!updatedUser) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "User not found" });
      }

      return res.status(STATUS_CODE.OK).json({ message: "Profile updated", data: updatedUser });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      const deletedUser = await authService.deleteUser(userId);

      if (!deletedUser) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "User not found" });
      }

      return res.status(STATUS_CODE.OK).json({ message: "User deleted", data: deletedUser });
    } catch (error) {
      return handleError(error, res);
    }
  }
}

module.exports = new AuthController();
