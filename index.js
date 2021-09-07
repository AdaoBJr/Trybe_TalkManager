const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fsp = require('fs').promises;
const crypto = require('crypto');
const {
  validatedEmail,
  validatedPassword,
  validatedToken,
  validatedName,
  validatedAge,
  validatedTalk,
  validatedWatchedAt,
  validatedRate,
} = require('./middlewares/validations');

const talkerData = './talker.json';
const talkerDotJSON = 'talker.json';
// variável criada pra corrigir repetição do termo pra se adequar ao ESLint

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkerData, 'utf-8', (error, data) => {
    if (error) {
      res.status(HTTP_OK_STATUS).json([]);
    }

    const talkers = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(talkers);
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(talkerData, 'utf-8', (error, data) => {
    if (error) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    const talkers = JSON.parse(data);
    const { id } = req.params;
    const talkerId = talkers.find((talker) => talker.id === Number(id));
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talkerId);
  });
});

app.post('/login', validatedEmail, validatedPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token: `${token}` });
});

app.post('/talker', validatedToken, validatedName, validatedAge,
  validatedTalk, validatedRate, validatedWatchedAt, (req, res) => {
  const talkers = fs.readFileSync(talkerDotJSON, 'utf8');
  const talkersJson = JSON.parse(talkers);
  const { name, age, talk } = req.body;
  const id = 5;
  const newTalker = ({ id, name, age, talk });
  talkersJson.push(newTalker);
  fs.writeFileSync(talkerDotJSON, JSON.stringify(talkersJson));
  return res.status(201).json({ id, name, age, talk });
});

app.put('/talker/:id', validatedToken, validatedName, validatedAge,
validatedTalk, validatedRate, validatedWatchedAt, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const updateTalker = await fsp.readFile(talkerDotJSON, 'utf8');
  const updateTalkerJson = await JSON.parse(updateTalker);
  const findTalker = updateTalkerJson.find((talker) => talker.id === Number(id));
  const talkerIndex = updateTalkerJson.indexOf(findTalker, 0);
  updateTalkerJson[talkerIndex] = { ...updateTalkerJson[talkerIndex], name, age, talk };
  await fsp.writeFile(talkerDotJSON, JSON.stringify(updateTalkerJson));
  return res.status(200).json(updateTalkerJson[talkerIndex]);
});

app.delete('/talker/:id', validatedToken, async (req, res) => {
  const { id } = req.params;
  const deleteTalker = await fsp.readFile(talkerDotJSON, 'utf-8');
  const deleteTalkerJson = await JSON.parse(deleteTalker);
  const findTalker = deleteTalkerJson.find((talker) => talker.id === Number(id));
  const talkerIndex = deleteTalkerJson.indexOf(findTalker, 0);
  if (talkerIndex === -1) return res.status(404).send({ message: 'Pessoa não encontrada' });
  deleteTalkerJson.splice(talkerIndex, 1);
  await fsp.writeFile(talkerDotJSON, JSON.stringify(deleteTalkerJson));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.use((error, _req, res, _next) => {
  res.status(500).json({ error: `Erro: ${error.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
