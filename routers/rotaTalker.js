const express = require('express');
const { promisify } = require('util');

const Talker = express.Router();
const fs = require('fs');

const HTTP_OK_STATUS = 200;
// const HTTP_OK_POST = 201;
// const HTTP_ERROR_VALUE = 400;
// const HTTP_ERROR_TOKEN = 401;
const HTTP_ERROR_STATUS = 404;
// const TOKEN_LENGTH = 16;
const DBString = 'talker.json';

Talker.get('/', async (req, res) => res.status(HTTP_OK_STATUS)
  .send(JSON.parse(await fs.readFile(DBString, 'utf-8'))));

Talker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const DB = JSON.parse(await fs.readFile(DBString, 'utf-8'));
  const resp = DB.find((item) => item.id === +id);
  if (!resp) {
    return res.status(HTTP_ERROR_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(DB.find((item) => item.id === +id));
});

Talker.post('/', async (req, res) => {
  // const DB = JSON.parse(await fs.readFile(DBString, 'utf-8'));
  // console.log(DB, 'entrei');

  fs.readFile(DBString, 'utf-8', promisify((err, content) => {
    const { body } = req;
    const DB = JSON.parse(content);
    const NewDB = [...DB, body];
    fs.writeFileSync(DBString, JSON.stringify(NewDB));
    res.status(200).send({ message: 'Teste OK' });
  }));
});

module.exports = Talker;
