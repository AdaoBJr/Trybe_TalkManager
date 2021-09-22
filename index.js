const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talkers = './talker.json';

const {
  validateEmail,
  validatePassword,
  createToken,
} = require('./middleware/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    if (err) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    const content = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(content);
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    const content = JSON.parse(data);
    const { id } = req.params;
    const talkerId = content.find((c) => c.id === Number(id));
    if (!talkerId) {
      return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talkerId);
  });
});

app.post('/login', validateEmail, validatePassword, (_req, res) => res.status(HTTP_OK_STATUS).json(
  {
    token: createToken(),
  },
));

app.listen(PORT, () => {
  console.log('Online');
});
