const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const { tokenCheks } = require('../middleware/validationToken');

const HTTP_OK_STATUS = 200;
const HTTP_OK_POST = 201;
const HTTP_ERROR_STATUS = 404;

const OldDB = async () => JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

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

router.post('/', tokenCheks, async (req, res) => {
  const { name, age, talk } = req.body;
  const DB = await OldDB();
  const newId = 1 + DB[DB.length - 1].id;
  const newData = { id: newId, name, age, talk };
  const newItem = JSON.stringify([...DB, newData]);
  await fs.writeFile('talker.json', newItem);
  return res.status(HTTP_OK_POST).send(newData);
});

module.exports = router;
