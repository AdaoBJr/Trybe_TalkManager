const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const fs = require('fs');
const fsp = require('fs').promises;
const { validEmail, validPassword } = require('./middlewares/validate');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fsp.readFile('./talker.json', 'utf8');
  const talkersJSON = JSON.parse(talkers);
  const talker = talkersJSON.find((talk) => talk.id === Number(id));
  if (!talker) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

// https://stackoverflow.com/questions/17604866/difference-between-readfile-and-readfilesync
app.get('/talker', (_req, res) => {
  try {
    const talkers = fs.readFileSync('talker.json');
    return res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json(JSON.parse([]));
  }
});

app.post('/login', validEmail, validPassword, (_req, res) => {
  const cryptoToken = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: `${cryptoToken}` });
});

app.use((err, _req, res, _next) => res.status(500).json({ error: `Erro: ${err.message}` }));

app.listen(PORT, () => {
  console.log('Online');
});
