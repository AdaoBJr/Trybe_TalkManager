const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fs2 = require('fs').promises;

const talkerJson = './talker.json';

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
  fs.readFile(talkerJson, 'utf-8', (err, content) => {
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
    const talkers = await fs2.readFile(talkerJson, 'utf-8');
    const parseTalkers = JSON.parse(talkers);
    const id = parseTalkers.length + 1;
    const newTalker = {
      id,
      name,
      age,
      talk,
    };
    const addTalker = JSON.stringify([...parseTalkers, newTalker]);
      await fs2.writeFile(talkerJson, addTalker);
      return res.status(201).json(newTalker);
    },
);

app.get(
  '/talker/search',
  validateToken,
  async (req, res) => {
    console.log(req.query)
    const talkers = await fs2.readFile(talkerJson, 'utf-8');
    const parseTalkers = await JSON.parse(talkers);
    const filterByName = parseTalkers.filter((talker) => talker.name !== req.query.q);
    console.log(filterByName);
    if(!filterByName || filterByName === 0){
      return res.status(401).json(parseTalkers);
    };
    return res.status(200).send(filterByName);
  },
);

app.get('/talker/:id', (req, res) => {
  fs.readFile(talkerJson, 'utf-8', (_err, content) => {
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

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkers = await fs2.readFile(talkerJson, 'utf-8');
    const parseTalkers = JSON.parse(talkers);
    const findTalker = parseTalkers.find((talker) => talker.id === Number(req.params.id));
    const foundIndex = parseTalkers.findIndex((talker) => talker.id === Number(req.params.id));
    parseTalkers[foundIndex] = {
      name,
      age,
      id: findTalker.id,
      talk: {
        watchedAt,
        rate,
      },
    };
    const updatedTalker = parseTalkers[foundIndex];
    const addTalker = JSON.stringify(parseTalkers);
    await fs2.writeFile(talkerJson, addTalker);
    return res.status(200).json(updatedTalker);
},
);

app.delete(
  '/talker/:id',
  validateToken,
  async (req, res) => {
    const talkers = await fs2.readFile(talkerJson, 'utf-8');
    const parseTalkers = JSON.parse(talkers);
    const filterById = parseTalkers.filter((talker) => talker.id === req.params.id);
    const stringifyTalkers = JSON.stringify(filterById);
    await fs2.writeFile(talkerJson, stringifyTalkers);
    return res.status(200).send(
      {
        message: 'Pessoa palestrante deletada com sucesso',
      },
    );
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
