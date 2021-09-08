const express = require('express');
const bodyParser = require('body-parser');
const randtoken = require('rand-token');
const date = require('date-and-time');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkerData = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

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

function validateWatchedAt(watchedAt) {
  if (!date.isValid(watchedAt, 'DD/MM/YYYY')) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
  return false;
}

function validateRate(talk) {
  if (talk.rate < 1 || talk.rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return validateWatchedAt(talk.watchedAt);
}

function validateTalk(talk) {
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) { // nota rodapé 1
    return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  }
  return validateRate(talk);
}

function validateAge(age, talk) {
  if (!age) return 'O campo "age" é obrigatório';
  if (parseInt(age, 10) < 18) return 'A pessoa palestrante deve ser maior de idade';
  return validateTalk(talk);
}

function validateName({ name, age, talk }) {
  if (!name || name.trim() === '') return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  return validateAge(age, talk);
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  if (Object.keys(req.body).length) {
    const message = validateName(req.body);
    if (message) {
      return res.status(400).json({ message });
    }
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

function validateId(req, res, next) {
  const { id } = req.params;
  const talkers = JSON.parse(readData());
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  req.talker = talker;
  req.talkers = talkers;
  next();
}

app.post('/login', validateData, (_req, res) => {
  const token = randtoken.generate(16);
  res.status(HTTP_OK_STATUS).json({ token });
});

app.get('/talker', (_req, res) => {
  const talkers = JSON.parse(readData());

  if (!talkers) return res.status(HTTP_OK_STATUS).json({});

  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/search', validateToken, (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(readData());
  
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(talkers);    
  }

  const searchTalkers = talkers.filter(({ name }) => name.includes(q));
  return res.status(HTTP_OK_STATUS).json(searchTalkers || {});
});

app.get('/talker/:id', validateId, (req, res) => {
  res.status(HTTP_OK_STATUS).json(req.talker);
});

app.post('/talker', validateToken, (req, res) => {
  const { body } = req;
  const talkers = JSON.parse(readData());
  const data = { id: talkers.length + 1, ...body };

  talkers.push(data);
  fs.writeFileSync(talkerData, JSON.stringify(talkers));
  res.status(201).json(data);
});

app.put('/talker/:id', validateId, validateToken, (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const talkerIndex = req.talkers.findIndex((t) => t.id === parseInt(id, 10));
  const data = { ...req.talker, ...body };

  req.talkers.splice(talkerIndex, 1, data);
  fs.writeFileSync(talkerData, JSON.stringify(req.talkers));
  res.status(200).json(data);
});

app.delete('/talker/:id', validateId, validateToken, (req, res) => {
  const { id } = req.params;
  const talkerIndex = req.talkers.findIndex((t) => t.id === parseInt(id, 10));
  req.talkers.splice(talkerIndex, 1);
  fs.writeFileSync(talkerData, JSON.stringify(req.talkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});

// nota rodapé 1: a condição !talk.rate é verdadeira para o caso do valor de rate ser "zero".
// Por isso se fez necessário acrescentar mais uma condição nesse caso. O requisito 4 passava,
// mas o 5 não estava passando.
