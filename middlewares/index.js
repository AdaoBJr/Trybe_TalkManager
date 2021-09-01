const express = require('express');
const crypto = require('crypto');

const app = express();

app.use(express.json());
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const readTalkers = () => fs.readFile('./talker.json', 'utf8');

// REQUISITO 2
const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const data = await readTalkers()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => {
      const talker = talkers.find((talkerID) => talkerID.id === +id);
      return talker;
    });
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).send(data);
};

// REQUISITO 1
const getTalkers = (_req, res) => {
  readTalkers().then((talkers) => res.status(HTTP_OK_STATUS).send(JSON.parse(talkers)))
  .catch((err) => res.status(401)
  .json({ message: `Error ${err}` }));

  if (!readTalkers) {
    return res.status(HTTP_OK_STATUS).JSON.parse([]);
  }
};

// REQUISITO 3
const validationEmail = (email) => {
  const messageRequired = { message: 'O campo "email" é obrigatório' };
  const messageForm = { message: 'O "email" deve ter o formato "email@email.com"' };
  const regex = new RegExp(/^[\w.]+@[a-z]+.\w{3}$/g);

  if (!email) return messageRequired;
  if (!regex.test(email)) return messageForm;
  return 'email ok';
};

const validationPassword = (password) => {
  const messageRequired = { message: 'O campo "password" é obrigatório' };
  const messageForm = { message: 'O "password" deve ter pelo menos 6 caracteres' };

  if (!password) return messageRequired;
  if (password.length < 6) return messageForm;
  return 'password ok';
};

// https://www.youtube.com/watch?v=Rcpy2Den2Ik&ab_channel=DevNami
function generateRandomToken() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = {
  getTalkers,
  getTalkerById,
  validationEmail,
  validationPassword,
  generateRandomToken,
};