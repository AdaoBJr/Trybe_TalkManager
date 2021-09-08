const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fs2 = require('fs').promises;

const talkers = './talker.json';

// const { json } = require('body-parser');
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
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    if (err) {
      res.status(200).json([]);
    }
    const content = JSON.parse(data);
    res.status(200).json(content);
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    if (err) {
      res.status(200).json([]);
    }
    const content = JSON.parse(data);
    const { id } = req.params;
    const idContent = content.find((c) => c.id === Number(id));
    if (!idContent) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(idContent);
  });
});

app.post('/login', validateEmail, validatePassword, (_req, res) => res.status(200).json(
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
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const readTalkers = await fs2.readFile(talkers, 'utf-8');
    const content = JSON.parse(readTalkers);
    const id = content.length + 1;
    const insertNew = {
      id,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    content.push(insertNew);
    const completeContent = JSON.stringify(content);
    await fs2.writeFile(talkers, completeContent);
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
    const readTalkers = await fs2.readFile(talkers, 'utf-8');
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
    await fs2.writeFile(talkers, completeContent);
    return res.status(200).json(updateContent);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const readTalkers = await fs2.readFile(talkers, 'utf-8');
  const content = JSON.parse(readTalkers);
  const removeIdContent = content.find((d) => d.id !== Number(id));
  const newContent = JSON.stringify(removeIdContent);
  await fs2.writeFile(talkers, newContent);
  return res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
