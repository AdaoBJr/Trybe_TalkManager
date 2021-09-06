const fs = require('fs');
const express = require('express');
const { join } = require('path');
const generatorToken = require('../generatorToken');

const filePath = join('users.json');

const getUsers = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUser = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));
};

const loginRoute = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_LOGUIN = 400;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = RegExp(/^[\w.]+@[a-z]+\.\w{2,3}$/g).test(email);
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
  const passowrdRegex = RegExp(/[\w\D]{6}/).test(password);
  const fieldPassword = res.status(HTTP_ERROR_LOGUIN)
    .send({ message: 'O campo "password" é obrigatório' });
  const invalidPassword = res.status(HTTP_ERROR_LOGUIN)
    .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });

  if (!password) return fieldPassword;
  if (!passowrdRegex) return invalidPassword;

  next();
};

const newUser = async (email, password) => {
  const newToken = await generatorToken();
  const user = {
    email,
    password,
    token: newToken,
  };
  return user;
};

loginRoute.post('/', isValidEmail, isValidPassword, (req, res) => {
  const users = getUsers();
  const { email, password } = req.body;
  users.push({ email, password });
  saveUser(users);
  // const { email, password } = req.body;
  const getToken = newUser(email, password);
  return res.status(HTTP_OK_STATUS).json({ token: getToken.token });
}); // Validando e-mail e password e gerando token

module.exports = loginRoute;
