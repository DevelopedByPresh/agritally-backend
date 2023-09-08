const { STATUS_CODE } = require("../utils/constants");
const handleError = require("../middleware/errorHandler.middleware");
const UserDto = require("../dtos/user/user.Dto");
const bcryptHelper = require('../lib/bcrypt');
const adminService = require('../services/admin.service');
const {
  registerSchema,
  loginSchema,
  validate,
} = require("../validators/validation");
const {generateJWTToken, decodeToken} = require("../lib/jwt.service")

class AdminController {
  async register(req, res) {
    try {
      const registerDto = req.body;
      validate(registerDto, registerSchema);

      // Check if the Admin already exists
      const existingAdmin = await adminService.getAdminByEmail(registerDto.email);
      if (existingAdmin) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ error: "Admin already exists" });
      }

      const hashedPassword = await bcryptHelper.hash(registerDto.password);
      const newAdmin = {
        ...registerDto,
        password: hashedPassword,
      };

      const createAdmin = await adminService.register(newAdmin);

      const { token, expiresIn} = await generateJWTToken({id:createAdmin.id, role: createAdmin.role})

      const adminDto = UserDto.fromRegister(createAdmin);

      return res
        .status(STATUS_CODE.CREATED)
        .cookie('access_token', token, {
          httpOnly: true,
          expires: new Date(expiresIn),
        })
        .json({ message: "Created successfully", data: adminDto, token, expiresIn });
    } catch (error) {
      console.log(error)
      return handleError(error, res);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      validate({ email, password }, loginSchema);

      const admin = await adminService.login(email, password);

      if (!admin) {
        return res
          .status(STATUS_CODE.UNAUTHORIZED)
          .json({ error: "Incorrect email or password" });
      }

      const { token, expiresIn} = await generateJWTToken({id:admin.id, role: admin.role})
      return res
        .status(STATUS_CODE.OK)
        .cookie('access_token', token, {
          httpOnly: true,
          expires: new Date(expiresIn),
        })
        .json({ message: "Login Success", data: admin, token, expiresIn  });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async getOneAdmin(req, res) {
    try {
      const { id } = req.params;

      const admin = await adminService.getAdminById(id);
      console.log("controler")

      if (!admin) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "Admin not found" });
      }

      return res.status(STATUS_CODE.OK).json({ data: admin });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async getAllAdmins(req, res) {
    try {
      const allAdmin = await adminService.getAllAdmins();


      return res.status(STATUS_CODE.OK).json({ count: allAdmin.length, data: allAdmin });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async updateProfile(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedAdmin = await adminService.updateAdminProfile(id, updates);

      if (!updatedAdmin) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "Admin not found" });
      }

      return res.status(STATUS_CODE.OK).json({ message: "Profile updated", data: updatedAdmin });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async deleteAdmin(req, res) {
    try {
      const { id } = req.params;

      const deletedAdmin = await adminService.deleteAdmin(id);

      if (!deletedAdmin) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "Admin not found" });
      }

      return res.status(STATUS_CODE.OK).json({ message: "Admin deleted"});
    } catch (error) {
      return handleError(error, res);
    }
  }
}

module.exports = new AdminController();
