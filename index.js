const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// Busquei ajuda para utilizar o crypto nesse link:https://qastack.com.br/programming/8855687/secure-random-token-in-node-js;
const crypto = require('crypto');
// const authLoginAndPassword = require('./login');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_OK_STATUS = 400;
const talkerFile = './talker.json';
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 7
app.get('/talker/search?', middlewares.validaToken, async (req, res) => {
  const { q } = req.query;
  const allTalkers = await fs.readFile('talker.json');
  const allTalkersJson = JSON.parse(allTalkers);
  if (q === '' || !q) {
    return res.status(200).json(allTalkersJson);
  }
  const files = allTalkersJson.filter((item) => item.name.includes(q));
  console.log(files);
  if (!files) {
    return res.status(200).json([]);
  }
  return res.status(200).json(files);
});

// REQUISITO 1
// Usei o async/await por se tratar de um funcção assíncrona (readFile);
app.get('/talker', async (_req, res) => {
  const getTalkers = await fs.readFile(talkerFile);
  const talkersJson = await JSON.parse(getTalkers);
  if (talkersJson.length === 0) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  return res.status(HTTP_OK_STATUS).send(talkersJson);
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const getTalkers = await fs.readFile(talkerFile);
  const talkersJson = await JSON.parse(getTalkers);
  const { id } = req.params;
  const getTheTalker = talkersJson.find((talker) => talker.id === +id);
  if (!getTheTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(getTheTalker);
});

// REQUISITO 3
const validaEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(HTTP_NOT_OK_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  const validateEmail = email.match(/[a-z]+@[a-z]+.com/g);
  if (!validateEmail
      ) {
      return res
          .status(HTTP_NOT_OK_STATUS)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
const validaSenha = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
      return res.status(HTTP_NOT_OK_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
      return res.status(HTTP_NOT_OK_STATUS)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};
app.post('/login', validaEmail,
validaSenha,
(_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

// REQUISITO 4

app.post('/talker', middlewares.validaToken, middlewares.validaName,
  middlewares.validaIdade, middlewares.validaSeTalkExiste,
  middlewares.validaTalk, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await fs.readFile(talkerFile); 
  const indexTalker = JSON.parse(talkers);
  const newObj = {
    name,
    age,
    id: (indexTalker.length + 1),
    talk: {
      watchedAt,
      rate,
    },
  };
  indexTalker.push(newObj);
  fs.writeFile('talker.json', JSON.stringify(indexTalker));
  const newFieldAdded = await fs.readFile(talkerFile);
  const newFieldJson = JSON.parse(newFieldAdded);
  const newField = newFieldJson.find((field) => field.name === name);
  return res.status(201).json(newField);
});

// REQUISITO 5
app.put('/talker/:id', middlewares.validaToken, middlewares.validaName,
  middlewares.validaIdade, middlewares.validaSeTalkExiste,
  middlewares.validaTalk, async (req, res, next) => {
  const { id } = req.params;
  const allFiles = await fs.readFile(talkerFile);
  const allFilesJson = JSON.parse(allFiles);
  const indexFile = allFilesJson.findIndex((item) => item.id === id);
  try {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    allFilesJson[indexFile] = {
    id,
    name,
    age,
    talk: { watchedAt, rate },
  };
  } catch (err) { next(err); }
  console.log(allFilesJson, id);
  fs.writeFile(talkerFile, JSON.stringify(allFilesJson));
  res.status(200).json(allFilesJson);
});

// REQUISITO 6
app.delete('/talker/:id', middlewares.validaToken, async (req, res) => {
  const { id } = req.params;
  const allFiles = await fs.readFile(talkerFile);
  const allFilesJson = JSON.parse(allFiles);
  const indexFile = allFilesJson.findIndex((item) => item.id === id);
  if (indexFile) {
    allFilesJson.splice(indexFile, 1);
  }
  fs.writeFile(talkerFile, JSON.stringify(allFilesJson));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// Middleware de erro
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: `Opa! Deu ruim: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
