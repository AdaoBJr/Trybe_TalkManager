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
const TALKER_JSON = './talker.json';

const readFile = (filePath) => {
  const file = fs.readFile(filePath, 'utf8');
  return file.then((data) => JSON.parse(data));
};

router.get('/', async (_req, res) => {
  const talkers = await readFile(TALKER_JSON);
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
    const talkers = await readFile(TALKER_JSON);
    const id = talkers.length + 1;
    const newTalker = {
      id,
      name,
      age,
      talk,
    };
    const newTalkers = JSON.stringify([...talkers, newTalker]);

    fs.writeFile(TALKER_JSON, newTalkers);
    return res.status(HTTP_CREATED).json(newTalker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile(TALKER_JSON);
  const talker = talkers.find((eachTalker) => eachTalker.id === +id);

  if (!talker) {
    return res.status(HTTP_NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readFile(TALKER_JSON);
    const talkerIndex = talkers.findIndex((talker) => talker.id === +id);
    const editedTalker = { id: +id, name, age, talk };

    talkers.splice(talkerIndex, 1, editedTalker);
    fs.writeFile(TALKER_JSON, JSON.stringify(talkers));

    return res.status(HTTP_OK_STATUS).json(editedTalker);
});

router.delete('/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile(TALKER_JSON);
    const filteredTalkers = talkers.filter((talker) => talker.id !== +id);

    fs.writeFile(TALKER_JSON, JSON.stringify(filteredTalkers));

    return res.status(HTTP_OK_STATUS).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
