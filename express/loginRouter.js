const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;
const REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

function emailValidation(email) {
  return REG.test(String(email).toLowerCase());
}
// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation(email)) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
   next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.toString().length < 6) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

router.post('/',
  validateEmail,
  validatePassword,
  (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(HTTP_OK_STATUS).json({ token: `${token}` });
  });

module.exports = router;