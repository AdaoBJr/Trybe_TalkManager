const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { gerarToken, validarEmail, validarSenha } = require('./funcoes');

const talkerFile = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// ------------------------------------------ //

// test getAllTalkers.test.js
app.get('/talker', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));

  if (talker.length > 0) {
    return res.status(200).json(talker);
  }
  if (talker.length === 0) {
    return res.status(200).json([]);
  }
});

// test getTalkerById.test.js
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  const talkerId = talker.find((t) => t.id === Number(id));

  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

// test login.test.js
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // const token = req.headers.authorization;
  const validaEmail = validarEmail(email);
  const validaSenha = validarSenha(password);

  if (validaEmail.Ok && validaSenha.Ok) {
  const token = gerarToken();
  return res.status(200).json({ token });
  }

  if (!validaEmail.Ok) {
    return res.status(validaEmail.status).json({ message: validaEmail.message });
  }
  if (!validaSenha.Ok) {
    return res.status(validaSenha.status).json({ message: validaSenha.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
