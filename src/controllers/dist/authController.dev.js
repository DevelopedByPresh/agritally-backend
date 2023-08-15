"use strict";

// controllers/authController.js
var express = require('express');

var AuthUseCases = require('../serivces/authUseCases');

var authController = express.Router();
var authUseCases = new AuthUseCases();
authController.post('/register', function _callee(req, res) {
  var _req$body, email, password, name, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, name = _req$body.name;
          _context.next = 4;
          return regeneratorRuntime.awrap(authUseCases.registerUser(email, password, name));

        case 4:
          user = _context.sent;
          res.status(201).json({
            message: 'User registered successfully',
            user: user
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: 'Registration failed',
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
authController.post('/login', function _callee2(req, res) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(authUseCases.loginUser(email, password));

        case 4:
          user = _context2.sent;
          res.status(200).json({
            message: 'Login successful',
            user: user
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(401).json({
            message: 'Login failed',
            error: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = authController;