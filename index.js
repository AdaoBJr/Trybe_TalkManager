const express = require('express');
const bodyParser = require('body-parser');
const Base64 = require('crypto-js/enc-base64');

const { getTalkers, generateToken } = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talkerById = talkers.find((talker) => talker.id === Number(id));
  
  if (!talkerById) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(talkerById);
});

function validateEmail(email) {
  const valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return valid.test(String(email).toLowerCase());
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  } if (!validateEmail(email)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"', 
    });
  }
  
  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres', 
    });
  }
  const token = generateToken(Math.random().toFixed(8));
  return res.status(HTTP_OK_STATUS).json({ token });
});
