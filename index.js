const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(talkers);
};

const PORT = '3000';
const HTTP_OK_STATUS = 200;
// const HTTP_201_STATUS = 201;
const HTTP_400_STATUS = 400;
// const HTTP_401_STATUS = 401;
const HTTP_404_STATUS = 404;
const VALID_EMAIL = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
// const VALID_DATA = /\d{2}\/\d{2}\/\d{4}/g;
const FAIL_MESSAGE = { message: 'Pessoa palestrante não encontrada' };
const REQUIRED_EMAIL = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const REQUIRED_PASSWORD = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' };
// const NOT_FOUND_TOKEN = { message: 'Token não encontrado' };
// const INVALID_TOKEN = { message: 'Token inválido' };
// const REQUIRED_NAME = { message: 'O campo "name" é obrigatório' };
// const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };
// const REQUIRED_AGE = { message: 'O campo "age" é obrigatório' };
// const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };
// const INVALID_TALK = { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
// const INVALID_DATE = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
// const INVALID_RATE = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 01
app.get('/talker', async (_request, response) => {
  const TALKERS = await getTalkers();
  response.status(HTTP_OK_STATUS).json(TALKERS);
});

// Requisito 02
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const TALKERS = await getTalkers();
  const talker = TALKERS.find((talk) => talk.id === parseInt(id, 10));
  if (!talker) {
    return response.status(HTTP_404_STATUS).json(FAIL_MESSAGE);
  }
  response.status(HTTP_OK_STATUS).json(talker);
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
  console.log("AQUI");
  const myToken = crypto.randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token: myToken });
});

// Requisito 04
