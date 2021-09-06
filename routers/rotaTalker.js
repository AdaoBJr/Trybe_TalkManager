const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
// const HTTP_OK_POST = 201;
// const HTTP_ERROR_VALUE = 400;
// const HTTP_ERROR_TOKEN = 401;
const HTTP_ERROR_STATUS = 404;
// const TOKEN_LENGTH = 16;
const DBString = fs.readFile('talker.json', 'utf-8');

router.get('/', async (req, res) => res.status(HTTP_OK_STATUS)
  .send(JSON.parse(await fs.readFile('talker.json', 'utf-8'))));

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const DB = JSON.parse(await DBString);
  const resp = DB.find((item) => item.id === +id);
  if (!resp) {
    return res.status(HTTP_ERROR_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(DB.find((item) => item.id === +id));
});

module.exports = router;
