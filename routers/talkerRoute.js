const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOTFOUND_STATUS = 404;

const getTalkerList = async () => {
  const list = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(list);
};

const addNewTalker = async (newTalker) => {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(newTalker));
    console.log('Talker has been successfully added');
  } catch (error) {
    console.error(`Error adding talker: ${error.message}`);
  }
};

router.get('/', async (_req, res) => {
  const talkersList = await getTalkerList();
  res.status(HTTP_OK_STATUS).json(talkersList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await getTalkerList();
  const talker = talkersList.find((t) => t.id === parseInt(id, 10));
  if (!talker) {
    return res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talker);
});

router.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersList = await getTalkerList();
  const addThisTalker = { name, age, id: talkersList.length + 1, talk };
  const listUpdated = [...talkersList, addThisTalker];
  await addNewTalker(listUpdated);
  res.status(HTTP_CREATED_STATUS).json(addThisTalker);
});

module.exports = router;
