const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const {
  validateToken,
  validateName,
  validateAge,
  validateObject,
  validateWatchedAt,
  validateRate,
  storeTalker,
} = require('./middlewares/createTalker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.post('/login', login.login, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).send({ token });
});
app.get('/talker', getAllTalkers);
app.get('/talker/search', validateToken, searchTalker);
app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateObject,
  validateWatchedAt,
  validateRate,
  storeTalker);

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateObject,
  validateWatchedAt,
  validateRate,
  editTalker);

app.get('/talker/:id', getTalkerById);
app.delete('/talker/:id', validateToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
