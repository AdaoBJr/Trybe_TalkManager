const express = require('express');
const { validateEmail, validatePassword, generateToken } = require('../controllers/loginControl');

const router = express.Router();

router.post('/',
  validateEmail,
  validatePassword,
  generateToken);

module.exports = router;