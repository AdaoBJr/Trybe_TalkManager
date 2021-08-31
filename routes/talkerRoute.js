const fs = require('fs');
const { join } = require('path');
const generatorToken = require('../generatorToken');

const filePath = join('talker.json');

const getTalkers = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const getRequisition = (req, res) => {
  const talkers = getTalkers();
  return res.status(200).send(talkers);
};

const getRequisitionID = (req, res) => {
  const talkers = getTalkers();
  const filterID = talkers.find((talk) => talk.id === Number(req.params.id));

  const result = !filterID
    ? res.status(404).send({ message: 'Pessoa palestrante não encontrada' })
    : res.status(200).send(filterID);

  return result;
};

const postRequisition = (req, res) => res.status(200).send({ token: generatorToken() });

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
const talkerRoute = (app) => {
  app.route('/talker').get(getRequisition); // Pegando usuários
  app.route('/talker/:id?').get(getRequisitionID); // Filtrando por Id de usuário
  app.route('/login').post(isValidEmail, isValidPassword, postRequisition); // Validando e-mail e password
};

module.exports = talkerRoute;
