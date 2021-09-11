const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalker,
  getTalkerId,
  login,
  addTalker,
  editTalker,
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaTalk,
  verificaData,
  verificaRate,
  deleteTalker,
 } = require('./middlewares');

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

app.get('/talker', getTalker);

app.get('/talker/:id', getTalkerId);

app.post('/login', login);

app.post('/talker', [
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaTalk,
  verificaData,
  verificaRate,
  addTalker,
]);

app.put('/talker/:id', [ 
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaData,
  verificaRate,
  editTalker,
]);

app.delete('/talker/:id', [
  verificaToken,
  deleteTalker,
]);
