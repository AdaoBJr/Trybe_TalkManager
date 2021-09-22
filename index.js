const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fsPromise = require('fs').promises;

const talkers = './talker.json';

const {
  validateEmail,
  validatePassword,
  createToken,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
} = require('./middleware/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    if (err) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    const content = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(content);
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    const content = JSON.parse(data);
    const { id } = req.params;
    const talkerId = content.find((c) => c.id === Number(id));
    if (!talkerId) {
      return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talkerId);
  });
});

app.post('/login', validateEmail, validatePassword, (_req, res) => res.status(HTTP_OK_STATUS).json(
  {
    token: createToken(),
  },
));

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk: { rate, watchedAt } } = req.body;
    const readTalkers = await fsPromise.readFile(talkers, 'utf-8');
    const content = JSON.parse(readTalkers);
    const id = content.length + 1;
    const insertNew = {
      id,
      name,
      age,
      talk: {
        rate,
        watchedAt,
      },
    };
    content.push(insertNew);
    const completeContent = JSON.stringify(content);
    await fsPromise.writeFile(talkers, completeContent);
    return res.status(201).json(insertNew);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const readTalkers = await fsPromise.readFile(talkers, 'utf-8');
    const content = JSON.parse(readTalkers);
    const searchTalker = content.find((t) => t.id === Number(id));
    const searchIndex = content.findIndex((i) => i.id === Number(id));

    content[searchIndex] = {
      id: searchTalker.id,
      name,
      age,
      talk: { watchedAt, rate },
    };
    
    const updateContent = content[searchIndex];
    const completeContent = JSON.stringify(content);
    await fsPromise.writeFile(talkers, completeContent);
    return res.status(HTTP_OK_STATUS).json(updateContent);
});

app.listen(PORT, () => {
  console.log('Online');
});
