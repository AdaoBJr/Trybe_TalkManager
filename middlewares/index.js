const express = require('express');
const crypto = require('crypto');

const app = express();

app.use(express.json());

const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_OK_CREATED = 201;

const HTPP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

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
  return crypto.randomBytes(8).toString('hex');
  // return '7mqaVRXJSp886CGr';
}

// REQUISITO 4
const postTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const listTalkers = await readTalkers().then((talkers) => {
    JSON.parse(talkers);
  });
  const talkersLength = listTalkers.length;
  const newTalker = {
    id: talkersLength + 1,
    name,
    age,
    talk,
  };
  listTalkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(listTalkers));
  return res.status(HTTP_OK_CREATED).send(newTalker);
};

const validationToken = (req, res, next) => {
  const token = req.headers.autorization;
  const tokenNotFound = { message: 'Token não encontrado' };
  const invalidToken = { message: 'Token inválido' };

  if (!token) return res.status(HTTP_UNAUTHORIZED).json(invalidToken);
  if (token.length !== 16) return res.status(HTTP_UNAUTHORIZED).json(tokenNotFound);

  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  const nameRequired = { message: 'O campo "name" é obrigatório' };
  const nameSize = { message: 'O "name" deve ter pelo menos 3 caracteres' };

  if (!name || name === ' ') return res.status(HTPP_BAD_REQUEST).json(nameRequired);
  if (name.length < 3) return res.status(HTPP_BAD_REQUEST).json(nameSize);

  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;
  const ageRequired = { message: 'O campo "age" é obrigatório' };
  const age18Years = { message: 'A pessoa palestrante deve ser maior de idade' };

  if (!age || age === ' ') return res.status(HTPP_BAD_REQUEST).json(ageRequired);
  if (Number(age) < 18) return res.status(HTPP_BAD_REQUEST).json(age18Years);

  next();
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  const talkRequired = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  if (!talk) return res.status(HTPP_BAD_REQUEST).json(talkRequired);
  if (!talk.warchedAt && talk.warchedAt !== 0) {
    return res.status(HTPP_BAD_REQUEST).json(talkRequired);
  }

  next();
};

const validationRate = (req, res, next) => {
  const { talk } = req.body;
  const rateNumbers = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

  if (talk.rate > 5 || talk.rate < 1) return res.status(HTPP_BAD_REQUEST).json(rateNumbers);

  next();
};

const validationDateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const dateForm = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  const regex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;

  if (!regex.test(talk.warchedAt)) return res.status(HTPP_BAD_REQUEST).json(dateForm);

  next();
};

module.exports = {
  getTalkers,
  getTalkerById,
  validationEmail,
  validationPassword,
  generateRandomToken,
  postTalker,
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationRate,
  validationDateWatchedAt,
};