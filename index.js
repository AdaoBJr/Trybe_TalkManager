const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalkers,
  getTalkerByID,
  getToken,
  postTalker,
} = require('./middlewares/index');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
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
// 4º Requisito:

app.post('/talker', validateToken, validateName, validateAge, validateTalk, postTalker);

// --------------------------------------------------------
// 3º Requisito:

app.post('/login', getToken);

// --------------------------------------------------------
// 2º Requisito:

app.get('/talker/:id', getTalkerByID);

// --------------------------------------------------------
// 1º Requisito:

app.get('/talker', getTalkers);

// --------------------------------------------------------
