const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./utils/getAllTalkers');
const getTalkerById = require('./utils/getTalkerById');
const login = require('./utils/login');
const createTalker = require('./utils/createTalker');
const editTalker = require('./utils/editTalker');
const deleteTalker = require('./utils/deleteTalker');
const searchTalker = require('./utils/searchTalker');

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

app.get('/talker', getAllTalkers);
app.post('/talker',
  createTalker.tokenValidation,
  createTalker.nameValidation,
  createTalker.ageValidation,
  createTalker.talkValidation,
  createTalker.watchedAtValidation,
  createTalker.rateValidation,
  createTalker.createTalker);
app.get('/talker/search', searchTalker);
app.get('/talker/:id', getTalkerById);
app.put('/talker/:id',
  editTalker.tokenValidation,
  editTalker.nameValidation,
  editTalker.ageValidation,
  editTalker.talkValidation,
  editTalker.watchedAtValidation,
  editTalker.rateValidation,
  editTalker.editTalker);
  app.delete('/talker/:id', deleteTalker);
app.post('/login', login);
