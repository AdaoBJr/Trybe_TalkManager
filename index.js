const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const isPasswordValid = require('./middlewares/isPasswordValid');
const isEmailValid = require('./middlewares/isEmailValid');
const generateToken = require('./functions/generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  try {
    const talkerData = fs.readFileSync('talker.json');
    res.status(200).json(JSON.parse(talkerData));
  } catch (err) {
    res.status(200).json(JSON.parse([]));
  }
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerData = JSON.parse(fs.readFileSync('talker.json'));
  const talker = talkerData.find((t) => t.id === Number(id));
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talker);
});

app.post('/login', isPasswordValid, isEmailValid, (req, res) => {
  const token = generateToken(16);
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
