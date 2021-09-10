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

app.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const talker = talkers.find((r) => r.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.json(talker);
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

app.post('/login', validateEmail, validatePassword, (req, res) =>
  // console.log(token);
  res.status(200).json({ token: createToken() }));

app.listen(PORT, () => {
  console.log('Online');
});
