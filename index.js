const express = require('express');
const bodyParser = require('body-parser');
const showPalestrantes = require('./construction/showPalestrantes');
const idPalestrante = require('./construction/idPalestrante');
/* const newPalestrante = require('./construction/newPalestrante');
 */const login = require('./construction/login');
const {
  autenticaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaRate,
  validaDate,
  addTalker,
} = require('./construction/addPalestrante');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('dd');
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', showPalestrantes);

app.get('/talker/:id', idPalestrante);

app.post('/login', login);

app.post('/talker',
  autenticaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaRate,
  validaDate,
  addTalker);
