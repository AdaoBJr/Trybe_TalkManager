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
} = require('./midlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Source: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js

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

// app.put('/talker/:id', (req, res, next) => {});

// app.delete('/talker/:id', (req, res, next) => {});

// app.get('/talker/search?q=searchTerm', (req, res, next) => {});

app.listen(PORT, () => {
  console.log('Online');
});
