const express = require('express');
const bodyParser = require('body-parser');

const { readContentFile } = require('./helpers/readWriteFiles');
const generateToken = require('./helpers/generateToken');
const { 
  isValidEmail,
  isValidPassword,
} = require('./middlewares/loginValidations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// All Talkers
app.get('/talker', async (_req, res) => {
  const talkers = await readContentFile();

  if (talkers) return res.status(HTTP_OK_STATUS).json(talkers);

  return res.status(HTTP_OK_STATUS).json([]);
});

// Talker by Id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await readContentFile();

  const talker = talkers.find((talkerId) => talkerId.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => res.status(HTTP_OK_STATUS).json({
  token: generateToken(),
}));

app.listen(PORT, () => {
  console.log('Online');
});
