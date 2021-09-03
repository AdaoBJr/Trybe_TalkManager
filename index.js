const fs = require('fs').promises;
const rescue = require('express-rescue');
const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser');
// const { json } = require('body-parser');
const authLogin = require('./middleware/login.js');
const { 
  isValidToken, 
  isValidName,
  isValidAge,
  isValidDate,
  isValidRate,
  isValidWatchAndDate,
  isValidTalk, 
} = require('./middleware/talker.js');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
const HTTP_OK_STATUS = 200;
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send());
// app.use(authLogin);

const PORT = '3000';

// Função para ler o Json!
 const getTalker = async () => {
  const resConvert = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(resConvert);
};

app.get('/talker', async (_request, response) => {
const talker = await getTalker();
  return response.status(HTTP_OK_STATUS).send(talker);
});

// REQUISITO 2

app.get('/talker/:id', rescue(async (_request, response) => {
const { id } = _request.params;
const talker = await getTalker();
const responseForUse = talker.find((AllTalkers) => AllTalkers.id === Number(id));
    if (!responseForUse) {
      return response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
      return response.status(HTTP_OK_STATUS).send(responseForUse);
}));

// REQUISITO 3

app.post('/login', authLogin, (_request, response) => {
const token = crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).json({
    token,
  });
});

// REQUISITO 4

app.post('/talker', 
isValidToken, 
isValidName,
isValidAge,
isValidTalk,
isValidDate, 
isValidRate, 
isValidWatchAndDate,
async (request, response) => {
const { name, age, talk } = request.body;
const objectoAtual = await getTalker();
const id = objectoAtual.length + 1;
objectoAtual.push({ name, age, id, talk });
await fs.writeFile('./talker.json', JSON.stringify(objectoAtual));
  return response.status(201).json({ name, age, id, talk });
});

// REQUISITO 5

app.put('/talker/:id', 
isValidToken, 
isValidName,
isValidAge,
isValidTalk,
isValidDate, 
isValidRate, 
isValidWatchAndDate,
async (request, response) => {
const talkers = await getTalker();
const { id } = request.params;
const { name, age, talk } = request.body;
const indexOfTalker = talkers.findIndex((talker) => talker.id === Number(id));
talkers[indexOfTalker] = { id: Number(id), name, age, talk };
await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return response.status(200).send(talkers[indexOfTalker]);
});

app.listen(PORT, () => {
  console.log('Online');
});
