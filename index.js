const express = require('express');
const bodyParser = require('body-parser');

const { 
  talker,
  talkerId,
  login,
  validateToken,
  validateTalker,
  addTalker,
  editTalker,
  deleteTalker,
  } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar..
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', login);

app.post('/talker',
  validateToken,
  validateTalker.validateName,
  validateTalker.validateAge,
  validateTalker.validateTalk1,
  validateTalker.validateTalk2,
  validateTalker.validateTalkDate,
  validateTalker.validateTalkRate,
  addTalker);

app.put('/talker/:id',
  validateToken,
  validateTalker.validateName,
  validateTalker.validateAge,
  validateTalker.validateTalk1,
  validateTalker.validateTalk2,
  validateTalker.validateTalkDate,
  validateTalker.validateTalkRate,
  editTalker);

app.delete('/talker/:id', validateToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online, beleza?');
});
