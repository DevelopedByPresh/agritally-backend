"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("../utils/constants"),
    STATUS_CODE = _require.STATUS_CODE;

var handleError = require("../middleware/errorHandler.middleware");

var UserDto = require("../dtos/userDto/userDTO");

var bcryptHelper = require('../lib/bcrypt');

var authService = require('../services/authService');

var _require2 = require("../validators/validation"),
    registerSchema = _require2.registerSchema,
    loginSchema = _require2.loginSchema,
    validate = _require2.validate;

var _require3 = require("../lib/jwt.service"),
    generateJWTToken = _require3.generateJWTToken,
    decodeToken = _require3.decodeToken;

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: "register",
    value: function register(req, res) {
      var registerDto, existingUser, hashedPassword, newUser, createUser, _ref, token, expiresIn, userDto;

      return regeneratorRuntime.async(function register$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              registerDto = req.body;
              validate(registerDto, registerSchema); // Check if the user already exists

              _context.next = 5;
              return regeneratorRuntime.awrap(authService.getUserByEmail(registerDto.email));

            case 5:
              existingUser = _context.sent;

              if (!existingUser) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(STATUS_CODE.BAD_REQUEST).json({
                error: "User already exists"
              }));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(bcryptHelper.hash(registerDto.password));

            case 10:
              hashedPassword = _context.sent;
              newUser = _objectSpread({}, registerDto, {
                password: hashedPassword
              });
              _context.next = 14;
              return regeneratorRuntime.awrap(authService.register(newUser));

            case 14:
              createUser = _context.sent;
              _context.next = 17;
              return regeneratorRuntime.awrap(generateJWTToken({
                id: createUser.id,
                role: createUser.role
              }));

            case 17:
              _ref = _context.sent;
              token = _ref.token;
              expiresIn = _ref.expiresIn;
              userDto = UserDto.fromRegister(createUser);
              return _context.abrupt("return", res.status(STATUS_CODE.CREATED).cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(expiresIn)
              }).json({
                message: "Created successfully",
                data: userDto,
                token: token,
                expiresIn: expiresIn
              }));

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", handleError(_context.t0, res));

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 24]]);
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var _req$body, email, password, user, _ref2, token, expiresIn;

      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              validate({
                email: email,
                password: password
              }, loginSchema);
              _context2.next = 5;
              return regeneratorRuntime.awrap(authService.login(email, password));

            case 5:
              user = _context2.sent;

              if (user) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(STATUS_CODE.UNAUTHORIZED).json({
                error: "Incorrect email or password"
              }));

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(generateJWTToken({
                id: user.id,
                role: user.role
              }));

            case 10:
              _ref2 = _context2.sent;
              token = _ref2.token;
              expiresIn = _ref2.expiresIn;
              return _context2.abrupt("return", res.status(STATUS_CODE.OK).cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(expiresIn)
              }).json({
                message: "Login Success",
                data: user,
                token: token,
                expiresIn: expiresIn
              }));

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", handleError(_context2.t0, res));

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 16]]);
    }
  }, {
    key: "getOneUser",
    value: function getOneUser(req, res) {
      var id, user;
      return regeneratorRuntime.async(function getOneUser$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return regeneratorRuntime.awrap(authService.getUserById(id));

            case 4:
              user = _context3.sent;

              if (user) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(STATUS_CODE.NOT_FOUND).json({
                error: "User not found"
              }));

            case 7:
              return _context3.abrupt("return", res.status(STATUS_CODE.OK).json({
                data: user
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", handleError(_context3.t0, res));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      var users;
      return regeneratorRuntime.async(function getAllUsers$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(authService.getAllUsers());

            case 3:
              users = _context4.sent;
              return _context4.abrupt("return", res.status(STATUS_CODE.OK).json({
                data: users
              }));

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", handleError(_context4.t0, res));

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "updateProfile",
    value: function updateProfile(req, res) {
      var userId, updates, updatedUser;
      return regeneratorRuntime.async(function updateProfile$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              userId = req.params.userId;
              updates = req.body;
              _context5.next = 5;
              return regeneratorRuntime.awrap(authService.updateUserProfile(userId, updates));

            case 5:
              updatedUser = _context5.sent;

              if (updatedUser) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(STATUS_CODE.NOT_FOUND).json({
                error: "User not found"
              }));

            case 8:
              return _context5.abrupt("return", res.status(STATUS_CODE.OK).json({
                message: "Profile updated",
                data: updatedUser
              }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", handleError(_context5.t0, res));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      var userId, deletedUser;
      return regeneratorRuntime.async(function deleteUser$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              userId = req.params.userId;
              _context6.next = 4;
              return regeneratorRuntime.awrap(authService.deleteUser(userId));

            case 4:
              deletedUser = _context6.sent;

              if (deletedUser) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", res.status(STATUS_CODE.NOT_FOUND).json({
                error: "User not found"
              }));

            case 7:
              return _context6.abrupt("return", res.status(STATUS_CODE.OK).json({
                message: "User deleted",
                data: deletedUser
              }));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", handleError(_context6.t0, res));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }]);

  return AuthController;
}();

module.exports = new AuthController();