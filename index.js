const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { validatedEmail, validatedPassword } = require('./middlewares/validations');

const talkerData = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkerData, 'utf-8', (error, data) => {
    if (error) {
      res.status(HTTP_OK_STATUS).json([]);
    }

    const talkers = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(talkers);
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(talkerData, 'utf-8', (error, data) => {
    if (error) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    const talkers = JSON.parse(data);
    const { id } = req.params;
    const talkerId = talkers.find((talker) => talker.id === Number(id));
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talkerId);
  });
});

app.post('/login', validatedEmail, validatedPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token: `${token}` });
});

app.use((error, _req, res, _next) => {
  res.status(500).json({ error: `Erro: ${error.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
