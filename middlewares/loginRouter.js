const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;

// RegEx to validate e-mail
const emailValidation = (email) => {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !!validation.test(String(email).toLowerCase());
};

// check email validations
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValidation(email)) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

// check password validations
const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

// POST
router.post('/',
  validateEmail,
  validatePassword,
  (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;
