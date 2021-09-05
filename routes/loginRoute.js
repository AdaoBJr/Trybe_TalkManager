const express = require('express');
const generatorToken = require('../generatorToken');

const loginRoute = express.Router();

const postRequisition = (_req, res) => {
  const token = generatorToken();
  return res.status(200).json({ token });
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  const fieldEmail = res.status(400).send({ message: 'O campo "email" é obrigatório' });
  const invalidEmail = res.status(400)
    .send({ message: 'O "email" deve ter o formato "email@email.com"' });

  if (!email) return fieldEmail;
  if (!emailRegex) return invalidEmail;

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const passowrdRegex = /[\w\D]{6}/.test(password);
  const fieldPassword = res.status(400).send({ message: 'O campo "password" é obrigatório' });
  const invalidPassword = res.status(400)
    .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });

  if (!password) return fieldPassword;
  if (!passowrdRegex) return invalidPassword;

  next();
};

loginRoute.post('/login', isValidEmail, isValidPassword, postRequisition); // Validando e-mail e password e gerando token

module.exports = loginRoute;
