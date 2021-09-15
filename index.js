const express = require('express');
const bodyParser = require('body-parser');
// const readMiddleware = require('./middlewares/readMiddleware');
const { getTalkers, getTalkersById, login } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// app.use('/talker', readMiddleware);
app.post('/login', login);
app.use('/talker/:id', getTalkersById);
app.use('/talker', getTalkers);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
