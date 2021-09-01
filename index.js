const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fs2 = require('fs').promises;

const {
  validateEmail,
  validatePassword,
  createToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
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
  fs.readFile('./talker.json', 'utf-8', (err, content) => {
    if (err) {
      return res.status(200).json([]);
    }
    const data = JSON.parse(content);
    return res.status(200).json(data);
  });
});

app.post('/login', validateEmail, validatePassword, (_req, res) => res.status(200).json(
  {
    token: createToken(),
  },
  ));

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await fs2.readFile('./talker.json', 'utf-8');
    const parseTalkers = JSON.parse(talkers);
    const id = parseTalkers.length + 1;
    console.log(id, 'IDDDDDDDDDDDDDDDDDDD')
    const newTalker = {
      id,
      name,
      age,
      talk,
    };
    const addTalker = JSON.stringify([...parseTalkers, newTalker])
      await fs2.writeFile('./talker.json', addTalker);
      return res.status(201).json(newTalker);
    },
);

app.get('/talker/:id', (req, res) => {
  fs.readFile('./talker.json', 'utf-8', (_err, content) => {
    const data = JSON.parse(content);
    const findId = data.find(({ id }) => id === Number(req.params.id));
    if (!findId) {
      return res.status(404).json(
        {
          message: 'Pessoa palestrante não encontrada',
        },
      );
    }
    return res.status(200).json(findId);
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
