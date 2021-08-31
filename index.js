const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const { token } = require('./token.js');

const talkead = async () => {
const talkers = './talker.json';
const getTalker = await fs.readFile(talkers);
const result = JSON.parse(getTalker);
return result;
};

console.log(token);
const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const { getAllTalkers, getTalkerID, validEmail, validPassword, validToken,
  validName,
  validAge,
  validTalk,
  validRate,
  validWatchedAt } = require('./middlewares');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// req - 1

app.get('/talker', getAllTalkers);

// req - 2

app.get('/talker/:id', getTalkerID);

// req - 3

app.post('/login', validEmail, validPassword, (_req, res) => res.status(200).json({ token }));

// req - 4
// readfile readright
app.post('/talker',
validToken,
validName,
validAge,
validTalk,
validRate,
validWatchedAt,
  async (req, res) => {
   const { name, age, talk: { watchedAt, rate } } = req.body;
   const oldTalk = await talkead();
   console.log('oldTalk', oldTalk);
   const result = {
    name,
    age,
    id: oldTalk.length + 1,
    talk: {
      watchedAt,
      rate,
    },
 };
   fs.writeFile('./talker.json', JSON.stringify([...oldTalk, result]));

  return res.status(201).json(result);
});

app.listen(PORT, () => {
  console.log('Online');
});

// Agradecimentos A Jefferson Andrade Turma 10 - Tribo B 
