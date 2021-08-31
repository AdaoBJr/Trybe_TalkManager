const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { validateEmail, validatePassword, createToken } = require('./middleware/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', 'utf-8', (err, content) => {
    if (err) {
      return res.status(200).json([]);
    }
    const data = JSON.parse(content);
    return res.status(200).json(data);
  });
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./talker.json', 'utf-8', (err, content) => {
    const data = JSON.parse(content);
    const talker = data.find((r) => r.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
  });
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = req.headers.authorization;
  if (token === '7mqaVRXJSp886CGr') return res.status(200).json({ token: createToken(16) });
});

app.listen(PORT, () => {
  console.log('Online');
});
