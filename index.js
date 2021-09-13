const express = require('express');
const bodyParser = require('body-parser');
// const readMiddleware = require('./middlewares/readMiddleware');
const { readMiddleware, getTalkersById } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// app.use('/talker', readMiddleware);
app.get('/talker/:id', getTalkersById);
app.get('/talker', readMiddleware);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
