const express = require('express');
const bodyParser = require('body-parser');
const randtoken = require('rand-token');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkerData = 'talker.json';

function validatePassword(password) {
  if (!password || password.trim() === '') return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
  return false;
}

function validateEmail(email, password) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  if (!email || email.trim() === '') return 'O campo "email" é obrigatório';
  if (!email.match(re)) return 'O "email" deve ter o formato "email@email.com"';
  return validatePassword(password);
}

function validateData(req, res, next) {
   const { email, password } = req.body;
   const message = validateEmail(email, password);
   if (message) {
    return res.status(400).json({ message });
   }
   
   next(); 
}

function readData() {
  try {
    const data = fs.readFileSync(talkerData, 'utf8');
    return data;
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${talkerData}\n Erro: ${err}`);
    process.exit(1);
  }
}

app.post('/login', validateData, (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: randtoken.generate(16) });
});

app.get('/talker', (req, res) => {
  const talkers = JSON.parse(readData());

  if (!talkers) return res.status(HTTP_OK_STATUS).json({});

  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(readData());
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
