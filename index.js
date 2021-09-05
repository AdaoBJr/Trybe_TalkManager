const express = require('express');
const bodyParser = require('body-parser');
const { 
  getAllTalkers, 
  getTalkerById,
  login,
  validateParams,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateTalk,
  createTalker } = require('./middlewere');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', login, validateParams);

app.use(validateToken);

app.post('/talker', 
  validateName, 
  validateAge,
  validateTalk,
  validateDate, 
  validateRate,  
  createTalker);

app.listen(PORT, () => {
  console.log('Online');
});
