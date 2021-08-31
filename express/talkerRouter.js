const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

async function readFileTalker() {
  try {
    const file = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.log(error.message);
  }
}

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFileTalker();
  const talker = talkers.find((el) => el.id === parseInt(id, 10));

  if (!talker) {
    return res.status(HTTP_NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    }); 
  }  
  return res.status(HTTP_OK_STATUS).send(talker);
});

router.get('/', async (_req, res) => {
  const talkers = await readFileTalker();
  if (!talkers) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;