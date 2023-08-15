// controllers/authController.js

const express = require('express');
const AuthUseCases = require('../serivces/authUseCases');

const authController = express.Router();
const authUseCases = new AuthUseCases();

authController.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await authUseCases.registerUser(email, password, name);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

authController.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authUseCases.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = authController;
