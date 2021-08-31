const express = require('express');
const bodyParser = require('body-parser');

const {
  talker,
  talkerId,
  login,
  addTalker,
  validateToken,
  validatesTalker,
  deleteTalker,
  editTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', login);

app.post(
  '/talker',
  validateToken,
  validatesTalker.validateName,
  validatesTalker.validateAge,
  validatesTalker.validateTalk,
  validatesTalker.validateTalkDate,
  validatesTalker.validateTalkRate,
  addTalker
);

app.put(
  '/talker/:id',
  validateToken,
  validatesTalker.validateName,
  validatesTalker.validateAge,
  validatesTalker.validateTalk,
  validatesTalker.validateTalkDate,
  validatesTalker.validateTalkRate,
  editTalker
);

 app.delete('/talker/:id',validateToken, deleteTalker);

// app.get('/talker/search?q=searchTerm', getTalker);

app.listen(PORT, () => {
  console.log('Online');
});
