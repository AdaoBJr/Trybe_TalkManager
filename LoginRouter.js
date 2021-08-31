const express = require('express');

const router = express.Router();
const { generateToken, regexEmail } = require('./helpers');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  } if (!regexEmail(email)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"', 
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres', 
    });
  }
  next();
};

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken(Math.random().toFixed(8));
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;
