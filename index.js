const express = require('express');
const bodyParser = require('body-parser');
const {
  readContentFile,
// writeContentFile,
} = require('./helpers');
const { validName, validPassword } = require('./validations');

const PATH_FILE = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 1
app.get('/talker', async (req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];
  const talker = talkers.find((i) => Number(i.id) === Number(id));

  if (talker) {
    res.status(200).json(talker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

// REQUISITO 3
app.post('/login', validName, validPassword, async (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

app.listen(PORT, () => {
  console.log('Online');
});
