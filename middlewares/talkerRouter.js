const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const router = express.Router();
router.use(bodyParser.json());

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./talkerHelpers');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;

const readFile = (filePath) => {
  const file = fs.readFile(filePath, 'utf8');
  return file.then((data) => JSON.parse(data));
};

router.get('/', async (_req, res) => {
  const talkers = await readFile('./talker.json');
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await readFile('./talker.json');
    const id = talkers.length + 1;
    const newTalker = {
      id,
      name,
      age,
      talk,
    };
    const newTalkers = JSON.stringify([...talkers, newTalker]);

    fs.writeFile('./talker.json', newTalkers);
    return res.status(HTTP_CREATED).json(newTalker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile('./talker.json');
  const talker = talkers.find((eachTalker) => eachTalker.id === parseInt(id, 2));

  if (!talker) {
    return res.status(HTTP_NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;
