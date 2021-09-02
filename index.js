const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalkers,
  getTalkerByID,
  getToken,
} = require('./middlewares/index');

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
// 3º Requisito:

app.post('/login', getToken);

// --------------------------------------------------------
// 2º Requisito:

app.get('/talker/:id', getTalkerByID);

// --------------------------------------------------------
// 1º Requisito:

app.get('/talker', getTalkers);

// --------------------------------------------------------
