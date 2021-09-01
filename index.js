const express = require('express');
const bodyParser = require('body-parser');

const { palestrantes, talkerId, loguin, exclude, talkerSearch } = require('./middlewares/index');
const { validaToken,
  validaTalk,
  validaRate,
  validaNome, validaDate, validaAge, addTalker, editTalker } = require('./middlewares/req-4');

const app = express();
app.use(bodyParser.json());

// const router = require('./routers/index');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// desafio7
app.get('/talker/search',
  validaToken,
  talkerSearch);

// // desafio 1
app.get('/talker', palestrantes);

// // desafio2
app.get('/talker/:id', talkerId);

// // desafio3
app.post('/login', loguin);

// // desafio4
app.post('/talker',
  validaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaDate,
  validaRate,
  addTalker);
// app.use('/talker', router);

// // desafio5
app.put('/talker/:id',
  validaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaDate,
  validaRate,
  editTalker);

// // desafio6
app.delete('/talker/:id',
  validaToken,
  exclude);

app.listen(PORT, () => {
  console.log('Online');
});
