const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MIDDLEWARE PARA LER O DOCUMENTO TALKER
const toRead = () => (
  fs.readFile('./talker.json')
  .then((response) => JSON.parse(response))
);

// MIDDLEWARE PARA GERAR TOKEN ALEATÓRIO
const toToken = () => {
  let text = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  
  return text;
};

// MIDDLEWARE PARA RETORNAR O TOKEN
const toGenerateToken = (req, res, next) => {
  const token = toToken();
  req.headers.authorization = token;
  res.status(200).json({ token });
  next();
};

// MIDDLEWARE PARA VERIFICAR O EMAIL
const toEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

// MIDDLEWARE PARA VERIFICAR O PASSWORD
const toPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await toRead();
  const getTalker = talkers.find((talker) => talker.id === Number(id));
  
  if (!getTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(getTalker);
});

// REQUISITO 1
app.get('/talker', async (_req, res) => {
  const talkers = await toRead();

  console.log(talkers);

  if (!talkers) return res.status(200).send([]);
    
  return res.status(200).send(talkers);
});

// REQUISITO 3
app.post('/login', toEmail, toPassword, toGenerateToken);

// // REQUISITO 4
// app.post('/talker', (req, res) => {
//   const { name, age, talk: { watchedAt, rate } } = req.body;

// });

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
