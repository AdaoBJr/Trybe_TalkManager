const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const createTalker = require('./middlewares/createTalker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');

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
app.post('/login', login);

// Requisito 04
app.post(
  '/talker',
  createTalker.isValidToken,
  createTalker.isValidName,
  createTalker.isValidAge,
  createTalker.isValidTalk,
  createTalker.isValidWatchedAt,
  createTalker.isValidRate,
  createTalker.createTalker,
);

// Requisito 05
app.put(
  '/talker/:id',
  editTalker.isValidToken,
  editTalker.isValidName,
  editTalker.isValidAge,
  editTalker.isValidTalk,
  editTalker.isValidWatchedAt,
  editTalker.isValidRate,
  editTalker.editTalker,
);

// Requisito 06
app.delete('/talker/:id', deleteTalker);

// Requisito 07
app.get('/talker/search', searchTalker);
