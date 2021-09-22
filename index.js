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
const VALID_EMAIL = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
const VALID_DATA = /\d{2}\/\d{2}\/\d{4}/g;
const NOT_REGISTERED = { message: 'Pessoa palestrante não encontrada' };
const REQUIRED_EMAIL = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const REQUIRED_PASSWORD = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' };
const NOT_FOUND_TOKEN = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };
const REQUIRED_NAME = { message: 'O campo "name" é obrigatório' };
const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };
const REQUIRED_AGE = { message: 'O campo "age" é obrigatório' };
const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };
const INVALID_TALK = { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
const INVALID_DATE = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
const INVALID_RATE = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

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
const getAllTalkers = async () => {
  const allTalkers = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(allTalkers);
};

// Requisito 01
app.get('/talker', async (_request, response) => {
  const talkers = await getAllTalkers();
  response.status(HTTP_OK_STATUS).json(talkers);
});

// Requisito 02
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await getAllTalkers();
  const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!talkerById) {
    return response.status(HTTP_404_STATUS).json(NOT_REGISTERED);
  }
  response.status(HTTP_OK_STATUS).json(talkerById);
});

// Requisito 03
const isValidEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email || email.length === 0) {
    return response.status(HTTP_400_STATUS).json(REQUIRED_EMAIL);
  }
  if (!VALID_EMAIL.test(email)) {
    return response.status(HTTP_400_STATUS).json(INVALID_EMAIL);
  }
  next();
};

const isValidPassword = (request, response, next) => {
  const { password } = request.body;
  if (!password || password.length === 0) {
    return response.status(HTTP_400_STATUS).json(REQUIRED_PASSWORD);
  }
  if (password.length < 6) {
    return response.status(HTTP_400_STATUS).json(INVALID_PASSWORD);
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
  if (name === undefined) {
    return response.status(HTTP_400_STATUS).json(REQUIRED_NAME);
  }
  if (name.length < 3) {
    return response.status(HTTP_400_STATUS).json(INVALID_NAME);
  }
  next();
};

const isValidAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(HTTP_400_STATUS).json(REQUIRED_AGE);
  }
  if (age < 18) {
    return response.status(HTTP_400_STATUS).json(INVALID_AGE);
  }
  next();
};

const isValidTalk = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt, rate } = talk;
  if (!talk || watchedAt === undefined || rate === undefined) {
    return response.status(HTTP_400_STATUS).json(INVALID_TALK);
  }
  if (!VALID_DATA.test(watchedAt)) {
    return response.status(HTTP_400_STATUS).json(INVALID_DATE);
  }
  if (rate < 1 || rate > 5) {
    return response.status(HTTP_400_STATUS).json(INVALID_RATE);
  }
  next();
};

app.post('/talker', isValidToken, isValidName, isValidAge, isValidTalk, async (request, response, _next) => {
  const talker = await getAllTalkers();
  const newTalker = { id: talker.length + 1, ...request.body };
  fs.writeFile('./talker.json', JSON.stringify([...talker, newTalker]));
  response.status(HTTP_201_STATUS).json(newTalker);
});

// Requisito 05
app.put('/talker/:id', isValidToken, isValidName, isValidAge, isValidTalk, async (request, response, _next) => {
  const { id } = req.params;
  const talkers = await getAllTalkers();

});
