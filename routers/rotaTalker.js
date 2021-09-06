const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_OK_POST = 201;
const HTTP_ERROR_VALUE = 400;
const HTTP_ERROR_TOKEN = 401;
const HTTP_ERROR_STATUS = 404;
const TOKEN_LENGTH = 16;

const OldDB = async () => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkerList);
};

router.get('/', async (req, res) => {
  const DB = await OldDB();
  return res.status(HTTP_OK_STATUS).send(DB);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const DB = await OldDB();
  const resp = DB.find((item) => item.id === +id);
  if (!resp) {
    return res.status(HTTP_ERROR_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(DB.find((item) => item.id === +id));
});

function TokenCheck(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_ERROR_TOKEN).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== TOKEN_LENGTH) {
    return res.status(HTTP_ERROR_TOKEN).send({ message: 'Token inválido' });
  }
}

function NameCheck(name, res) {
  if (!name) { 
    return res.status(HTTP_ERROR_VALUE).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function AgeCheck(age, res) {
  if (!age) { 
    return res.status(HTTP_ERROR_VALUE).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
}

function watchedAtChech(watchedAt, res) {
  const dataRegex = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
  if (!dataRegex.test(watchedAt)) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function TalkCheck(talk, res) {
  if (!talk) {
    return res.status(HTTP_ERROR_VALUE)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const { watchedAt, rate } = talk;
  if (!talk.watchedAt || !talk.rate) {
    return res.status(HTTP_ERROR_VALUE)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  watchedAtChech(watchedAt, res);
  const rateNumber = [1, 2, 3, 4, 5];
  if (!rateNumber.includes(rate)) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
} 

// router.put('/:id', async (req, res) => {
//   TokenCheck(req, res);
//   const { id } = req.params;
//   const DB = await OldDB();
//   const index = DB.findIndex((data) => data.id === +id);
//   const { name, age, talk } = req.body;
//   NameCheck(name, res);
//   AgeCheck(age, res);
//   TalkCheck(talk, res);
//   oldData[index] = { id: +id, name, age, talk };
//   await fs.writeFile('./talker.json', JSON.stringify(DB));
//   return res.status(HTTP_OK_STATUS).send({ id: +id, name, age, talk });
  // return res.status(index).send(name, age, talk);
// });

router.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  TokenCheck(req, res);
  NameCheck(name, res);
  AgeCheck(age, res);
  TalkCheck(talk, res);
  const DB = await OldDB();
  const newId = 1 + DB.length;
  const newData = { id: newId, name, age, talk };
  DB.push(newData);
  // await fs.writeFile('./talker.json', JSON.stringify(DB));
  // return res.status(HTTP_OK_POST).send(newData);
  return res.status(HTTP_OK_POST).send(name, age, talk);
});

module.exports = router;
