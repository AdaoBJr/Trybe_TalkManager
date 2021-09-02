const express = require('express');
const bodyParser = require('body-parser');
const { 
  readAllTalkers, 
  readTalkerById,
  validateUser,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalkInfo,
  readAndPushNewTalker,
  editTalker,
  deleteTalker,
} = require('./midlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', readAllTalkers);

app.get('/talker/:id', readTalkerById);

app.post('/login', validateUser);

app.use(validateToken);

app.post('/talker',
  validateName,
  validateAge,
  validateTalkInfo,
  validateRate,
  validateWatchedAt,
  readAndPushNewTalker);

app.put('/talker/:id',
  validateName,
  validateAge, 
  validateTalkInfo,
  validateRate,
  validateWatchedAt, 
  editTalker);

app.delete('/talker/:id', deleteTalker);

// app.get('/talker/search?q=searchTerm', (req, res, next) => {});

app.listen(PORT, () => {
  console.log('Online');
});
