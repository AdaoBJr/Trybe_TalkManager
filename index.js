const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talkers = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
function generateToken(length) {
  // edit the token allowed characters
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

app.post('/login', (req, res, nex) => {
  const token = { token: generateToken(16) };
  const { email } = req.body;
  const { password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (validateEmail(email) !== true) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json(token);
  nex();
});

// Developer Mozilla: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = talkers.find((obj) => obj.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.get('/talker', async (_req, res) => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  const response = await JSON.parse(file);
  return res.status(200).json(response);

  // try {
  //   const file = await fs.readFile('./talker.json', 'utf-8');
  //   const response = await JSON.parse(file);
  //   return res.status(200).json(response);
  // } catch (error) {
  //   return res.status(500).json({ error: `Erro: ${err.message}` });
  // }

  // if (talkers.length === 0) return res.status(200).json([]);
  // return res.status(200).json(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
