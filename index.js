const express = require('express');
const bodyParser = require('body-parser');

const {
  getAllTalkers,
  getTalkerById,
  login,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
} = require('./middlewares');

const {
  readFileTalker,
  isValidPassword,
  isValidEmail,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
} = require('./helpers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 01
app.get('/talker', getAllTalkers);

// Requisito 02
app.get('/talker/:id', getTalkerById);

// Requisito 03
app.post('/login', isValidPassword, isValidEmail, login);

// Requisito 04
app.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  createTalker,
);

// Requisito 05
app.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  editTalker,
);

// Requisito 06
app.delete('/talker/:id', isValidToken, deleteTalker);

// Requisito 07
app.get('/talker/search', isValidToken, searchTalker);
