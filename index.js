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

// req 7 
app.get('/talker/search', validToken, async (req, res) => {
  const { q } = req.query;
  const newQ = q.toLowerCase();
  const talk = await talkead();
  const filterName = talk.filter((r) => r.name.toLowerCase().includes(newQ));
  if (!q) {
    return res.status(200).json(filterName);
  }
  return res.status(200).json(filterName);
});

// req - 3

app.post('/login', validEmail, validPassword, (_req, res) => res.status(200).json({ token }));

// req - 4

app.post('/talker',
validToken,
validName,
validAge,
validTalk,
validWatchedAt,
validRate,
  async (req, res) => {
   const { name, age, talk: { watchedAt, rate } } = req.body;
   const oldTalk = await talkead();
   
   const result = {
    name,
    age,
    id: oldTalk.length + 1,
    talk: {
      watchedAt,
      rate,
    },
 };
 await fs.writeFile('./talker.json', JSON.stringify([...oldTalk, result]));
 
 return res.status(201).json(result);
});
// req - 2

app.get('/talker/:id', getTalkerID);

// req - 5 
app.put('/talker/:id',
validToken,
validName,
validAge,
validTalk,
validWatchedAt,
validRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const oldTalk = await talkead();
  const index = oldTalk.findIndex((r) => r.id === Number(id));

  const obj = { ...oldTalk[index], name, age, talk: { watchedAt, rate } };
  await fs.writeFile('./talker.json', JSON.stringify([obj]));

  return res.status(200).json(obj);
});

// req 6 
app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const oldTalk = await talkead();
  const index = oldTalk.findIndex((r) => r.id === Number(id));
  oldTalk.splice(index, 1);
  fs.writeFile('talker.json', JSON.stringify(oldTalk));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
// Agradecimentos A Jefferson Andrade Turma 10 - Tribo B 

app.listen(PORT, () => {
  console.log('Online');
});