const express = require('express');
const bodyParser = require('body-parser');

const {
  talker,
  talkerId,
  login,
  addTalker,
  getTalker,
  deleteTalker,
  editTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', login);

// app.post('/talker', addTalker);

// app.put('/talker/:id', editTalker);

// app.delete('/talker/:id', deleteTalker);

// app.get('/talker/search?q=searchTerm', getTalker);

app.listen(PORT, () => {
  console.log('Online');
});
