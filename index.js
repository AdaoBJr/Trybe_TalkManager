const express = require('express');
const bodyParser = require('body-parser');
const randtoken = require('rand-token');
const date = require('date-and-time');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
let token;

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

function validateRate(rate) {
  if (rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return false;
}

function validateWatchedAt(talk) {
  if (!date.isValid(talk.watchedAt, 'DD-MM-YYYY')) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
  return validateRate(talk.rate);
}

function validateTalk(talk) {
  if (!talk || !talk.watchedAt || !talk.rate) {
    return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  }
  return validateWatchedAt(talk);
}

function validateAge(age, talk) {
  if (!age || age.trim() === '') return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';
  return validateTalk(talk);
}

function validateName(name, age, talk) {
  if (!name || name.trim() === '') return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  return validateAge(age, talk);
}

function validateToken(req, res, next) {
  // const { token } = req;
  const { name, age, talk } = req.body;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  const message = validateName(name, age, talk);
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
  token = randtoken.generate(16);
  res.status(HTTP_OK_STATUS).json({ token });
  // req.token = token;
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

app.post('/talker', validateToken, (req, res) => {
  const { name, age, talk } = req.body;
  const data = { id: 1, name, age, talk };
  fs.writeFileSync(talkerData, data);
  res.status(201).json(data);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
