const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile, writeContentFile } = require('./helpers/readWriteFiles');
const generateToken = require('./helpers/generateToken');
const isValidQuery = require('./middlewares/queryValidation');
const { 
  isValidEmail,
  isValidPassword,
} = require('./middlewares/loginValidations');

const { 
  isValidToken, 
  isValidName, 
  isValidAge, 
  isValidTalk,
  isValidRate,
  isValidWatchedAt } = require('./middlewares/talkerValidations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readContentFile();

  if (talkers) return res.status(HTTP_OK_STATUS).json(talkers);

  return res.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/search', isValidToken, isValidQuery, async (req, res) => {
  const { q } = req.query;

  const talkers = await readContentFile();
  const findTalkers = talkers.filter((talker) => talker.name.includes(q));

  return res.status(HTTP_OK_STATUS).json(findTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile();

  const talker = talkers.find((talkerId) => talkerId.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(HTTP_OK_STATUS).json(
    {
      token: generateToken(),
    },
  );
});

app.post('/talker', 
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
  async (req, res) => {
  const { name, age, talk } = req.body;    

    const talkers = await readContentFile();
    const talkerId = talkers.length + 1;

    const newTalker = { id: talkerId, name, age, talk };
    console.log('talkers do arquivo', talkers);

    talkers.push(newTalker);
    console.log('após o push', talkers);
    await writeContentFile(talkers);

    res.status(201).json(newTalker);
});

app.put('/talker/:id', 
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;    

    const talkers = await readContentFile();
    const talkerIndex = talkers.findIndex((talkerId) => talkerId.id === parseInt(id, 10));
    const newTalker = { id: parseInt(id, 10), name, age, talk };

    talkers[talkerIndex] = newTalker;

    await writeContentFile(talkers);

    res.status(200).json(newTalker);
});

app.delete('/talker/:id', isValidToken, async (req, res) => {
  const { id } = req.params;

  const talkers = await readContentFile();
  const talkerIndex = talkers.findIndex((talkerId) => talkerId.id === parseInt(id, 10));

  talkers.splice(talkerIndex, 1);

  await writeContentFile(talkers);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});

// Feito em pair programming com Wellington Passo
