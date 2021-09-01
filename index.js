const express = require('express');
const bodyParser = require('body-parser');
const { 
  getAllTalkers,
  getSingleTalker,
  checkEmail,
  checkPassword,
  createToken,
  addNewTalker,
  checkAge,
  checkDate,
  checkName,
  checkRate,
  checkTalk,
  checkToken, 
  editTalker, 
  deleteTalker, 
  searchTalker } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', checkToken, searchTalker);

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getSingleTalker);

app.post('/login', checkEmail, checkPassword, createToken);

app.post('/talker', [
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  addNewTalker,
]);

app.put('/talker/:id', [
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  editTalker,
]);

app.delete('/talker/:id', [
  checkToken,
  deleteTalker,
]);

app.listen(PORT, () => {
  console.log(`Online e ouvindo na ${PORT}`);
});
