const express = require('express');
const bodyParser = require('body-parser');
const {
  login,
  validateMail,
  validatePass,
  getAllTalkers,
  getTalkerById,
  createTalker,
} = require('./middlewares');
const editTalker = require('./middlewares/editTalker');
const { validateToken } = require('./middlewares/login');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');
const {
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
} = require('./middlewares/createTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateMail, validatePass, login);
app.get('/talker', getAllTalkers);
app.get('/talker/search', validateToken, searchTalker);
app.get('/talker/:id', getTalkerById);
app.delete('/talker/:id', validateToken, deleteTalker);
app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  createTalker,
);
app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  editTalker,
);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.code).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log('Online');
});
