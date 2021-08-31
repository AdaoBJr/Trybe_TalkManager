const fs = require('fs');
const { join } = require('path');
const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

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

const saveTalkers = (talkers) => {
  fs.writeFileSync(filePath, JSON.stringify(talkers, null, '\t'));
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

const postRequisition = (req, res) => res.status(200).send({ token: generateToken() });

const validateEmail = (email) => {
  const expressionRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return !expressionRegex.test(email);
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const fieldEmail = res.status(400).send({ message: 'O campo "email" é obrigatório' });
  const invalidEmail = res.status(400)
    .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  const verifyEmail = validateEmail(email) ? next() : invalidEmail;
  const result = email ? verifyEmail : fieldEmail;
  return result;
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const fieldPassword = res.status(400).send({ message: 'O campo "password" é obrigatório' });
  const invalidPassword = res.status(400)
    .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  const result = password.toString().length < 5 ? invalidPassword : !password ? fieldPassword : next();
  return result;
};
const talkerRoute = (app) => {
  app.route('/talker').get(getRequisition); // Pegando usuários
  app.route('/talker/:id?').get(getRequisitionID); // Filtrando por Id de usuário
  app.route('/login').post(isValidEmail, isValidPassword, postRequisition); // Filtrando por Id de usuário
};

module.exports = talkerRoute;
