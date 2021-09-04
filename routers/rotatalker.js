const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

router.get('/', async (req, res) => res.status(HTTP_OK_STATUS)
  .send(JSON.parse(await fs.readFile('talker.json', 'utf-8'))));

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const DB = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  const resp = DB.find((item) => item.id === +id);
  console.log(resp);
  if (!resp) {
    return res.status(HTTP_ERROR_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(DB.find((item) => item.id === +id));
});

module.exports = router;
