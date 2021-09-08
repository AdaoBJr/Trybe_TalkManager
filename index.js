const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const talkerJson = require('./talker.json');

const {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateDateAndRate,
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

app.post('talker', validateName,
  validateAge,
  validateDate,
  validateRate,
  validateDateAndRate, (req, res) => {
    const { name, age, talk } = req.body;

    talkerJson.push({ name, age, talk });
    return res.status(201);
  });

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const tk = crypto.randomBytes(8).toString('hex');
  // console.log(token);
  return res.status(200).json({ token: tk });
});

app.listen(PORT, () => {
  console.log('Online');
});
