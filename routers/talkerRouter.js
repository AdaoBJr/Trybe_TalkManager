const router = require('express').Router();

const { readContentFile, writeContentFile } = require('../helpers/readWriteFile');
const { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate } = require('../middlewares/validations');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];

  const talkerId = talkers.find((talker) => talker.id === Number(id));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talkerId);
});

router.post('/',
validateToken, 
validateName,
validateAge,
validateTalk,
validateRate,
validateWatchedAt,

async (req, res) => {
  const newTalker = { ...req.body };
  const talker = await writeContentFile(PATH_FILE, newTalker);

  return res.status(201).json([talker]);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];
  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));
  
  talkers.splice(talkerId, 1);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;