const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { getTalkersList, getTalkerById, addTalker,
  updateTalker, excludeTalker, filterTalkersByName } = require('./readFile.js');

const { validateEmail,
  validatePassword,
  validateName,
  validateToken,
  validateWatchedAt,
  validateAge,
  validateRate,
  validateTalk,
} = require('./authentication');

app.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
    const allTalkers = await getTalkersList();
    res.status(HTTP_OK_STATUS).json(allTalkers);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const filteredTalkers = await filterTalkersByName(q);
  res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const token = randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { body } = req;
    const talker = await addTalker(body);
    res.status(201).json(talker);
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { params: { id }, body } = req;
    const talker = await updateTalker(id, body);
    res.status(200).json(talker);
  },
);

app.delete(
  '/talker/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    await excludeTalker(id);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

app.listen(PORT, () => {
  console.log('Now live running at Port 3000!');
});
