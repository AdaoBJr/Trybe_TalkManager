const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', require('./src/getAllTalkers'));
app.get('/talker/:id', require('./src/getTalkerById'));
app.post('/login', require('./src/login'));
app.post('/talker', require('./src/createTalker'));
app.put('/talker/:id', require('./src/editTalker'));
app.delete('/talker/:id', require('./src/deleteTalker'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
