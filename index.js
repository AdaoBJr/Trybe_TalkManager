const express = require('express');
const bodyParser = require('body-parser');

// const { talkerSearch, palestrantes, talkerId, loguinToken,
//   post, putFunction, exclude } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// desafio7
// app.get('/talker/search', talkerSearch);

// // desafio 1
// app.get('/talker', palestrantes);

// // desafio2
// app.get('/talker/:id', talkerId);

// // desafio3
// app.post('/loguin', loguinToken);

// // desafio4
// app.post('/talker', post);

// // desafio5
// app.put('/talker/:id', putFunction);

// // desafio6
// app.delete('/talker/:id', exclude);

app.listen(PORT, () => {
  console.log('Online');
});
