const express = require('express');
const { randomBytes } = require('crypto');
const { passwordCheks, emailCheks } = require('../middleware/validations');

const login = express.Router();

const HTTP_OK_STATUS = 200;

login.post('/', passwordCheks, emailCheks, (req, res) => {
const token = randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = login;