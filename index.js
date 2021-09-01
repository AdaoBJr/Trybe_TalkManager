const express = require('express');
const bodyParser = require('body-parser');
//
const { palestrantes, talkerId, loguin, talkerSearch } = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

// const router = require('./routers/index');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// desafio7
app.get('/talker/search', talkerSearch);

// // desafio 1
app.get('/talker', palestrantes);

// // desafio2
app.get('/talker/:id', talkerId);

// // desafio3
app.post('/login', loguin);

// // desafio4
// app.post('/talker', post);
// app.use('/talker', router);

// // desafio5
// app.put('/talker/:id', putFunction);

// // desafio6
// app.delete('/talker/:id', exclude);

app.listen(PORT, () => {
  console.log('Online');
});
