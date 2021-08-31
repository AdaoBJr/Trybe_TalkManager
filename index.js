const express = require('express');
const bodyParser = require('body-parser');

const { readContentFile } = require('./helpers/readWriteFile');
const generateToken = require('./helpers/generateToken');

const { isValidEmail, isValidPassword } = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const content = (await readContentFile()) || [];
  return res.status(200).send(content);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const content = (await readContentFile()) || [];

  const talker = await content.find((talk) => talk.id === Number(id));

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(talker);
});

app.post('/login', isValidEmail, isValidPassword, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
