const express = require('express');
const bodyParser = require('body-parser');
const {
getTalkers,
getId,
verificateLogin,
addNewTalker,
validateName,
validateToken,
validateAge,
validateDate,
validateRate,
validateTalk,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online em localhost:${PORT}`);
});

app.get('/talker', getTalkers);
app.get('/talker/:id', getId);

app.post('/login', verificateLogin);
app.post('/talker', 
  [
    addNewTalker,
    validateToken,
    validateName,
    validateAge,
    validateDate,
    validateRate,
    validateTalk,
  ]);
