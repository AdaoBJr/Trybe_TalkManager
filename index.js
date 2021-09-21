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
  removeTalker,
  searchTalkers,
} = require('./middlewares');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();
app.use(bodyParser.json());

// app.use('/talker', readMiddleware);
app.post('/login', login);
app.get('/talker/search', auth, searchTalkers);
app.get('/talker/:id', getTalkersById);
app.post('/talker', auth, valid, createTalker);
app.get('/talker', getTalkers);
app.put('/talker/:id', auth, valid, modTalker);
app.delete('/talker/:id', auth, removeTalker);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
