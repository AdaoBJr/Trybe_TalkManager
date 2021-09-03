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

router.get(
  '/search',
  checkToken,
  async (req, res) => {
    const { q } = req.query.q;
    
    const talkersList = await readFile();
    const talker = talkersList.filter((item) => item.name.includes(q));
    
    if (!q) return res.status(200).json(talkersList);
    res.status(200).json(talker);
  },
);

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

router.put(
  '/:id',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkRate,
  checkWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    
    const talkersList = await readFile();
    const talker = talkersList.findIndex((item) => +item.id === +id);

    talkersList[talker] = { ...talkersList[talker], name, age, talk };
    
    fs.writeFileSync('./talker.json', JSON.stringify(talkersList));
    
    return res.status(200).json(talkersList[talker]);
  },
);

router.delete(
  '/:id',
  checkToken,
  async (req, res) => {
    const { id } = req.params;
    
    const talkersList = await readFile();
    const talker = talkersList.findIndex((item) => +item.id === +id);
    
    talkersList.splice(talker, 1);

    fs.writeFileSync('./talker.json', JSON.stringify(talkersList));
    
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

module.exports = router;
