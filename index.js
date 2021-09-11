const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const talkerJson = require('./talker.json');

const {
  validateEmail,
  validatePassword,
  createToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
} = require('./validate');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Olhei o código do colega Thiago Leite para fazer esta função
const getTalkers = () => fs.readFile('./talker.json', 'utf-8').then((res) => JSON.parse(res));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, async (req, res) => {
  const talkers = await getTalkers();
  const { q } = req.query;
  const filterTalkers = talkers.filter((p) => p.name.includes(q));

  if (!filterTalkers || filterTalkers === '') {
    return res.status(200).json(talkers);
  }

  // if (filterTalkers !== name) {
  //   return res.status(200).json([]);
  // }

  return res.status(200).json(filterTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const talker = talkers.find((r) => r.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.json(talker);
});

app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  if (!talkers) {
    return res.send([]);
  }
  return res.json(talkers);
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const addTalker = {
      name,
      id: 5,
      age,
      talk,
    };

    const newTalker = [...talkers, addTalker];
    await fs.writeFile('./talker.json', JSON.stringify(newTalker));
    return res.status(201).json(addTalker);
  });

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const talkers = await getTalkers();
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkersIndex = talkers.findIndex((talker) => talker.id === Number(id));

    if (talkersIndex === -1) {
      return res.status(404).end();
    }

    talkers[talkersIndex] = { ...talkers[talkersIndex], name, age, talk };
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return res.status(200).json(talkers[talkersIndex]);
  });

app.delete('/talker/:id',
  validateToken,
  async (req, res) => {
    const talkers = await getTalkers();
    const { id } = req.params;
    const talkersIndex = talkers.findIndex((talker) => talker.id === Number(id));

    if (talkersIndex === -1) {
      return res.status(404).end();
    }

    talkers.splice(talkersIndex, 1);
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

app.post('/login', validateEmail, validatePassword, (req, res) =>
  // console.log(token);
  res.status(200).json({ token: createToken() }));

app.listen(PORT, () => {
  console.log('Online');
});
