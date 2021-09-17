const express = require('express');
const crypto = require('crypto');

const loginRouter = express.Router();
// let token = null;
let token = '1234567891234567'

const generatesToken = () => {
  token = crypto.randomBytes(8).toString('hex');
};

const validatesEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const validateUserInfo = (email, isValidEmail, password, res) => {
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!isValidEmail) {
    return res.status(400).json({
      message: 'O email deve ter o formato "email@email.com"',
    });
  }
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
};

loginRouter.post('/', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const isValidEmail = validatesEmail(email);
  validateUserInfo(email, isValidEmail, password, res);
  await generatesToken();
  return res.status(200).json({
    token,
  });
});

module.exports = {
  loginRouter,
  token
};