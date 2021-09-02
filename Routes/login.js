const express = require('express');
const crypto = require('crypto');
const { validateLogin } = require('../Validation');

const login = express.Router();

// Requisito 3
login.post(
  '/',
  validateLogin,
  (_req, res) => { 
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  },
);

module.exports = login;
