const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const {
  getAllTalkers,
  getTalkerById,
  readFile,
} = require('../middlewares/getMiddlewares');

const {
  checkAge,
  checkName,
  checkRate,
  checkToken,
  checkWatchedAt,
  checkTalk,
} = require('../middlewares/validationMiddlewares');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  const allTalkers = await getAllTalkers();
  if (allTalkers) return res.status(200).send(allTalkers);
  return res.status(404).json({ message: 'Not found!' });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (talkerById) return res.status(200).json(talkerById);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post(
  '/',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkRate,
  checkWatchedAt,
  async (req, res) => {
    const talkers = await readFile();
    const { name, age, talk } = req.body;
    const nextId = talkers.length + 1;
    
    talkers.push({ id: nextId, name, age, talk });

    fs.writeFileSync('./talker.json', JSON.stringify(talkers));
    
    return res.status(201).json({ id: nextId, name, age, talk });
  },
);

module.exports = router;
