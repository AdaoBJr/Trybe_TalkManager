const express = require('express');
const fs = require('fs').promises;
const readFileFs = require('./helpers/readFIle');
const overwriteWriteFile = require('./helpers/writeFile');

const route = express.Router();

const talkerJsonPath = './talker.json';

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 401;
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const tokenNotFound = 'Token não encontrado';
const invalidToken = 'Token inválido';

const nameNotFound = 'O campo "name" é obrigatório'; 
const invalidName = 'O "name" deve ter pelo menos 3 caracteres';

const ageNotFound = 'O campo "age" é obrigatório';
const invalidAge = 'A pessoa palestrante deve ser maior de idade';

const invalidWatchedAt = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

const invalidRate = 'O campo "rate" deve ser um inteiro de 1 à 5';

const invalidTalk = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(HTTP_NOT_FOUND_STATUS).json({ message: tokenNotFound });
  if (typeof token !== 'string'
  || token.length !== 16) return res.status(HTTP_NOT_FOUND_STATUS).json({ message: invalidToken });
  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: nameNotFound });
  if (name.length < 3) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: invalidName });
  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: ageNotFound });
  if (age < 18) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: invalidAge });
  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk
    || talk.watchedAt === undefined
    || talk.rate === undefined) {
      return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: invalidTalk });
    }
  next();
};

const verifyWatchedAt = (req, res, next) => {
  const talk = req.body.talk.watchedAt;
  const dateRegex = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/gm;
  if (!talk
  || !(dateRegex.test(talk))) {
    return res
    .status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: invalidWatchedAt });
  }
  next();
};

const verifyRate = (req, res, next) => {
  const talk = req.body.talk.rate;
  if (!talk
    || typeof talk !== 'number'
    || Number(talk) > 5
    || Number(talk) < 1) {
      return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: invalidRate });
    }
    next();
};

route.delete('/:id',
verifyToken,
async (req, res) => {
  const { id } = req.params;
  const excludedPerson = 'Pessoa palestrante deletada com sucesso';
  const fileObject = await readFileFs(talkerJsonPath);
  const newObj = fileObject.filter(({ id: talkerId }) => Number(id) !== Number(talkerId));
  overwriteWriteFile('talker.json', newObj);
  res.status(HTTP_OK_STATUS).json({ message: excludedPerson });
});

route.put('/:id',
verifyToken,
verifyName,
verifyAge,
verifyTalk,
verifyRate,
verifyWatchedAt,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const fileObject = await readFileFs(talkerJsonPath);
  let newTalker = {};
  const newObj = fileObject.map((talker) => {
    if (talker.id === Number(id)) {
      const newId = Number(talker.id);
      console.log('type of newid', typeof newId);
      newTalker = { age, id: newId, name, talk };
      return newTalker;
    }
    return talker;
  });
  overwriteWriteFile('talker.json', newObj);
  res.status(HTTP_OK_STATUS).json(newTalker);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const fileObject = await readFileFs(talkerJsonPath);
  const choosenTalker = fileObject.find((talker) => Number(id) === talker.id);
  if (!choosenTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(choosenTalker);
});

route.post('/',
verifyToken,
verifyName,
verifyAge,
verifyTalk,
verifyRate,
verifyWatchedAt,
async (req, res) => {
  const { name, age, talk } = req.body;
  const objArchive = await readFileFs(talkerJsonPath);
  const nextId = objArchive.reduce((acc, { id }) => {
    let newId = acc;
    if (id > acc) {
      newId = id;
    }
    return newId;
  }, 0) + 1;
  const newTalker = { id: nextId, name, age, talk };
  const newObj = [...objArchive, newTalker];
  overwriteWriteFile('talker.json', newObj);
  res.status(HTTP_CREATED_STATUS).json(newTalker);
});

route.get('/', async (_request, response) => {
  const fileResponse = await fs.readFile(talkerJsonPath, 'utf-8');
  response.status(200).json(JSON.parse(fileResponse));
});

module.exports = route;