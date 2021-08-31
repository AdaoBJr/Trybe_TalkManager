const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readFile = () => (
  fs.readFile('./talker.json')
  .then((response) => JSON.parse(response))
);

const writeFile = (content) => (
  fs.writeFile('./talker.json', JSON.stringify(content), 'utf-8')
);

const generateRandom = () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];
  const token = [];
  for (let index = 1; index <= 15; index += 1) {
    const number = Math.ceil(Math.random() * 9);
    token.push(number);
  }
  const letterPosition = Math.round(Math.random() * 25);
  return token.join('').concat(alphabet[letterPosition]);
};

app.get('/talker', async (_req, res) => {
 const content = await readFile();
 if (content.length > 0) {
  return res.status(200).json(content);
 }
 return res.status(200).send([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const content = await readFile();
  const targetTalker = content.find((talker) => talker.id === parseInt(id, 10));
  if (targetTalker) {
    return res.status(200).json(targetTalker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato email@email.com' });
  }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const generateToken = (req, res, next) => {
  const token = generateRandom();
  req.headers.authorization = token;
  res.status(200).json({ token });
  next();
};

app.post('/login', verifyEmail, verifyPassword, generateToken);

const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const authenticateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400)
    .json({
      message: 'O campo "talk" é obrigatório e "watchedAt"'
      + ' e "rate" não podem ser vazios',
    });
  }
  const { watchedAt, rate } = talk;
  if (!watchedAt || !rate) {
    return res.status(400)
    .json({
      message: 'O campo "talk" é obrigatório e "watchedAt"'
      + ' e "rate" não podem ser vazios',
    });
  }
  next();
};

const verifyDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateSplit = watchedAt.split('/');
  const day = dateSplit[0];
  const month = dateSplit[1];
  const year = dateSplit[2];
  if (
    dateSplit.length !== 3
    || day.length !== 2
    || month.length !== 2
    || year.length !== 4
  ) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const verifyRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

app.post('/talker',
verifyToken, verifyName, verifyAge, authenticateTalk, verifyDate, verifyRate,
 async (req, res) => {
  const content = await readFile();
  const newtalker = req.body;
  newtalker.id = content[content.length - 1].id + 1;
  const newContent = [...content, newtalker];
  await writeFile(newContent);
  return res.status(201).json(newtalker);
});
