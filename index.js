const express = require('express');
const bodyParser = require('body-parser');
// const readMiddleware = require('./middlewares/readMiddleware');
const {
  getTalkers,
  getTalkersById,
  login,
  auth,
  valid,
  createTalker,
  modTalker,
} = require('./middlewares');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();
app.use(bodyParser.json());

// app.use('/talker', readMiddleware);
app.post('/login', login);
app.use('/talker/:id', getTalkersById);
app.use('/talker', getTalkers);
app.post('/talker', auth, valid, createTalker);
app.put('/talker/:id', auth, valid, modTalker);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
