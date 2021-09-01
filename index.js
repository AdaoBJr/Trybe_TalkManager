const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const { readFile, writeFile } = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// #1 Cria o endpoint GET /talker
app.get('/talker', async (_req, res) => {
  res.status(HTTP_OK_STATUS).json(JSON.parse(await fs.readFile('./talker.json', 'utf-8')));
});
// #2 Cria o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('talker.json')
    .then((content) => JSON.parse(content))
    .catch((err) => console.log(`erro: ${err.message}`));
  const talk = talkers.find((talkId) => talkId.id === +id);
  if (!talk) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talk);
});
// #3 Cria o endpoint POST /login
app.post('/login', (req, res) => {
  const emailVallid = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailVallid(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const Rand = () => Math.random(0).toString(36).substr(2);
  const token = (length) => (Rand() + Rand()).substr(0, length);
  return res.status(HTTP_OK_STATUS).json({ token: token(16) });
});
// #4 Cria o endpoint POST /talker
const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};
const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
const validTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk.rate === '' || talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};
const validTalkWatched = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dataFormat = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!watchedAt.match(dataFormat)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};
const validRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
const readContentFile = async () => {
  try {
    const content = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};
const writeContentFile = async (content) => {
  try {
    const newTalker = await readContentFile();
    const newId = newTalker.length + 1;
    const newContent = { id: newId, ...content };
    newTalker.push(newContent);
    await fs.writeFile('./talker.json', JSON.stringify(newTalker));
    return newContent;
  } catch (error) {
    return null;
  }
};
// POST /talker
app.post('/talker', validToken, validName, validAge,
validTalker, validTalkWatched, validRate, async (req, res) => {
  const data = req.body;
  const newData = await writeContentFile(data);
  return res.status(201).json(newData);
});

app.listen(PORT, () => {
  console.log('Online');
});
