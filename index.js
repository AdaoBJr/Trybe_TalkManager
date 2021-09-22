const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const PORT = '3000';
const HTTP_OK_STATUS = 200;
const HTTP_201_STATUS = 201;
const HTTP_400_STATUS = 400;
const HTTP_401_STATUS = 401;
const HTTP_404_STATUS = 404;
const REGEX_EMAIL = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
const REGEX_DATE = /\d{2}\/\d{2}\/\d{4}/g;
const NOT_REGISTERED = { message: 'Pessoa palestrante não encontrada' };
const EMAIL_IS_REQUIRED = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const PASSWORD_IS_REQUIRED = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' };
const NOT_FOUND_TOKEN = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };
const NAME_IS_REQUIRED = { message: 'O campo "name" é obrigatório' };
const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };
const AGE_IS_REQUIRED = { message: 'O campo "age" é obrigatório' };
const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };
const INVALID_TALK = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};
const INVALID_DATE = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
const INVALID_RATE = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
const DELETE_OK = { message: 'Pessoa palestrante deletada com sucesso' };

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Início do meu código (exceto constantes)
const readFileTalker = async () => {
  const allTalkers = await fs.readFile('./talker.json', 'utf8');
  const alltalkersJSON = JSON.parse(allTalkers);
  return alltalkersJSON;
};

const getAllTalkers = async (_request, response) => {
  const allTalkers = await readFileTalker();
  return response.status(HTTP_OK_STATUS).json(allTalkers);
};

const getTalkerById = async (request, response) => {
  const { id } = request.params;
  const allTalkers = await readFileTalker();
  const talkerById = allTalkers.find((talker) => talker.id === parseInt(id, 10));
  if (!talkerById) {
    return response.status(HTTP_404_STATUS).json(NOT_REGISTERED);
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
};

// Requisito 01
app.get('/talker', getAllTalkers);

// Requisito 02
app.get('/talker/:id', getTalkerById);

// Requisito 03
const isValidPassword = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    return response.status(HTTP_400_STATUS).json(PASSWORD_IS_REQUIRED);
  }
  if (password.length < 6) {
    return response.status(HTTP_400_STATUS).json(INVALID_PASSWORD);
  }
  next();
};

const isValidEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email) {
    return response.status(HTTP_400_STATUS).json(EMAIL_IS_REQUIRED);
  }
  if (!REGEX_EMAIL.test(email)) {
    return response.status(HTTP_400_STATUS).json(INVALID_EMAIL);
  }
  next();
};

app.post('/login', isValidPassword, isValidEmail, (_require, response) => {
  const myToken = crypto.randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token: myToken });
});

// Requisito 04
const isValidToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(HTTP_401_STATUS).json(NOT_FOUND_TOKEN);
  }
  if (authorization.length !== 16) {
    return response.status(HTTP_401_STATUS).json(INVALID_TOKEN);
  }
  next();
};

const isValidName = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(HTTP_400_STATUS).json(NAME_IS_REQUIRED);
  }
  if (name.length < 3) {
    return response.status(HTTP_400_STATUS).json(INVALID_NAME);
  }
  next();
};

const isValidAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(HTTP_400_STATUS).json(AGE_IS_REQUIRED);
  }
  if (age < 18) {
    return response.status(HTTP_400_STATUS).json(INVALID_AGE);
  }
  next();
};

const isValidTalk = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt, rate } = talk;
  if (!talk || !watchedAt || !rate) {
    return response.status(HTTP_400_STATUS).json(INVALID_TALK);
  }
  next();
};

const isValidWatchedAt = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  if (!REGEX_DATE.test(watchedAt)) {
    return response.status(HTTP_400_STATUS).json(INVALID_DATE);
  }
  next();
};

const isValidRate = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return response.status(HTTP_400_STATUS).json(INVALID_RATE);
  }
  next();
};

app.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  async (request, response, _next) => {
    const { name, age, talk } = request.body;
    const talker = await getAllTalkers();
    const newTalker = {
      name,
      age,
      id: talker.length + 1,
      talk: { ...talk },
    };
    talker.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(talker));
    response.status(HTTP_201_STATUS).json(newTalker);
  },
);

// Requisito 05
app.put(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  async (request, response, _next) => {
    const { name, age, talk } = request.body;
    const { id } = request.params;
    const talker = await getAllTalkers();
    const editTalker = {
      name,
      age,
      id: Number(id),
      talk: { ...talk },
    };
    const getTalker = talker.filter((filtertalker) => filtertalker.id !== id);
    getTalker.push(editTalker);
    await fs.writeFile('./talker.json', JSON.stringify(getTalker));
    response.status(HTTP_OK_STATUS).json(editTalker);
  },
);

// Requisito 06
app.delete('/talker/:id', isValidToken, async (request, response) => {
  const { id } = request.params;
  const talkers = await getAllTalkers();
  const talker = talkers.filter((filtertalker) => filtertalker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(talker));
  response.status(HTTP_OK_STATUS).json(DELETE_OK);
});

// Requisito 07
app.get('/talker/search', isValidToken, async (request, response) => {
  const { q } = request.query;
  const talkers = getAllTalkers();
  if (!q) {
    return response.status(HTTP_OK_STATUS).json(talkers);
  }
  const talker = talkers.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));
  if (talker) {
    return response.status(HTTP_OK_STATUS).json(talker);
  }
  response.status(HTTP_OK_STATUS).json([]);
});
