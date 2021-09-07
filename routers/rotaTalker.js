const fs = require('fs').promises;
const express = require('express');

const Talker = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

const OldDB = async () => {
  const DB = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(DB);
};

Talker.get('/', async (req, res) => {
  const DB = await OldDB();
  return res.status(HTTP_OK_STATUS).send(DB);
});

Talker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const DB = await OldDB();
  const resp = DB.find((item) => item.id === +id);
  if (!resp) {
    return res.status(HTTP_ERROR_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(DB.find((item) => item.id === +id));
});

module.exports = Talker;
