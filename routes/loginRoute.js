const express = require('express');
const generatorToken = require('../generatorToken');

const loginRoute = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_LOGUIN = 400;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/i.test(email);
  const fieldEmail = res.status(HTTP_ERROR_LOGUIN)
    .send({ message: 'O campo "email" é obrigatório' });
  const invalidEmail = res.status(HTTP_ERROR_LOGUIN)
    .send({ message: 'O "email" deve ter o formato "email@email.com"' });

  if (!email) return fieldEmail;
  if (!emailRegex) return invalidEmail;

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const passowrdRegex = /[\w\D]{6}/.test(password);
  const fieldPassword = res.status(HTTP_ERROR_LOGUIN)
    .send({ message: 'O campo "password" é obrigatório' });
  const invalidPassword = res.status(HTTP_ERROR_LOGUIN)
    .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });

  if (!password) return fieldPassword;
  if (!passowrdRegex) return invalidPassword;

  next();
};

loginRoute.post('/', isValidEmail, isValidPassword, (_req, res) => {
  return res.status(HTTP_OK_STATUS).json({ token: generatorToken() });
}); // Validando e-mail e password e gerando token

module.exports = loginRoute;
