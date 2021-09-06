const express = require('express');
const bodyParser = require('body-parser');
const showPalestrantes = require('./construction/showPalestrantes');
const idPalestrante = require('./construction/idPalestrante');
const login = require('./construction/login');
const { confirmeEmail, confirmePassword } = require('./construction/autenticarLogin');

const {
  autenticaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaRate,
  validaDate,
  addTalker,
  editTalker,
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

app.post('/login', confirmeEmail, confirmePassword, login);

app.post('/talker',
  autenticaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaRate,
  validaDate,
  addTalker);

app.put('/talker/:id',
  autenticaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaRate,
  validaDate,
  editTalker);
