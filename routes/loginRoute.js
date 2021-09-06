const express = require('express');
const generatorToken = require('../generatorToken');

const loginRoute = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/i.test(email);
  if (!email) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
    }
  if (!emailRegex) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const passowrdRegex = /[\w\D]{6}/.test(password);

  if (!password) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
    }
  if (!passowrdRegex) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

loginRoute.post('/', isValidEmail, isValidPassword, async (req, res) => {
  const { email, password } = req.body;
  const getToken = await generatorToken();
  return res.status(HTTP_OK_STATUS).json({ 
    email,
    password,
    token: getToken,
   });
}); // Validando e-mail e password e gerando token

module.exports = loginRoute;
