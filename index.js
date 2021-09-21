const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const TALKERS = JSON.parse(fs.readFileSync('talker.json'));
const PORT = '3000';
const HTTP_OK_STATUS = 200;
const HTTP_ALERT_STATUS = 400;
const HTTP_FAIL_STATUS = 404;
const VALID_EMAIL = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
const FAIL_MESSAGE = { message: 'Pessoa palestrante não encontrada' };
const REQUIRED_EMAIL = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O email deve ter o formato "email@email.com"' };
const REQUIRED_PASSWORD = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O password deve ter pelo menos 6 caracteres' };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 01
app.get('/talker', (_request, response) => {
  response.status(HTTP_OK_STATUS).send(TALKERS);
});

// Requisito 02
app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const talker = TALKERS.find((talk) => talk.id === parseInt(id, 10));
  if (!talker) {
    return response.status(HTTP_FAIL_STATUS).send(FAIL_MESSAGE);
  }
  response.status(HTTP_OK_STATUS).send(talker);
});

// Requisito 03
const isValidEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email || email.length === 0) {
    response.status(HTTP_ALERT_STATUS).send(REQUIRED_EMAIL);
  }
  if (!VALID_EMAIL.test(email)) {
    response.status(HTTP_ALERT_STATUS).send(INVALID_EMAIL);
  }
  next();
};

const isValidPassword = (request, response, next) => {
  const { password } = request.body;
  if (!password || password.length === 0) {
    response.status(HTTP_ALERT_STATUS).send(REQUIRED_PASSWORD);
  }
  if (password.length < 6) {
    response.status(HTTP_ALERT_STATUS).send(INVALID_PASSWORD);
  }
  next();
};

app.post('./login', isValidEmail, isValidPassword, (_require, response) => {
  const myToken = crypto.randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).send({ token: myToken });
});
