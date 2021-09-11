const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalkers,
  getTalkerByID,
  getToken,
  postTalker,
  putTalker,
  /* deleteTalker, */
} = require('./middlewares/index');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');

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

// --------------------------------------------------------
// 2º Requisito:

app.get('/talker/:id', getTalkerByID);

// --------------------------------------------------------
// 1º Requisito:

app.get('/talker', getTalkers);

// --------------------------------------------------------
// 3º Requisito:

app.post('/login', getToken);

// --------------------------------------------------------

// Source: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/e0470c45-ed25-49b8-9675-47bb00b17e42/criando-middlewares-globais-com-appuse/de9e872b-d5ab-4bdc-8daf-39ee16b17e34?use_case=next_button
// Ativa o uso dos middlewares comuns a todas as rotas abaixo:
app.use(validateToken);

// 4º Requisito:

app.post('/talker',
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  postTalker);

// --------------------------------------------------------
// 5º Requisito:

app.put('/talker/:id',
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  putTalker);

// --------------------------------------------------------
// 6º Requisito:

// app.delete('/talker/:id', validateToken, deleteTalker);

// --------------------------------------------------------
