const fs = require('fs').promises;
const express = require('express');

const router = express.Router();

const fileReader = async () => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkerList);
};

router.get('/', async (req, res) => {
  const talkers = await fileReader();
return res.status(200).send(talkers);
});

router.get('/:id', async (req, res) => {
const { id } = req.params;
const file = await fileReader();
const talker = file.find((item) => item.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json({ talker }); 
});

module.exports = router;