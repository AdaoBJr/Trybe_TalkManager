const router = require('express').Router();

const { readContentFile, writeContentFile, overwriteFile } = require('../helpers/readWriteFile');
const { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate } = require('../middlewares/validations');

const PATH_FILE = './talker.json';

router.get('/search', validateToken, async (req, res) => {
  const searchTerm = req.query.q;
  const talkers = await readContentFile(PATH_FILE) || [];
  if (!searchTerm) return res.status(200).json([talkers]);

  const filteredTalkers = talkers.filter((talker) => talker.name.includes(searchTerm));
  if (!filteredTalkers) return res.status(200).json();
  
  return res.status(200).json(filteredTalkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];

  const talkerId = talkers.find((talker) => talker.id === Number(id));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talkerId);
});

router.get('/', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
});

router.post('/',
validateToken, 
validateName,
validateAge,
validateTalk,
validateRate,
validateWatchedAt,

async (req, res) => {
  const talkers = await readContentFile(PATH_FILE);
  const id = talkers.length + 1;
  const newTalker = { id, ...req.body };

  const talker = await writeContentFile(PATH_FILE, newTalker);

  return res.status(201).json(talker);
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
  const talkers = await readContentFile(PATH_FILE) || [];
  
  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerId] = { id: Number(id), name, age, talk };
  
  await overwriteFile(PATH_FILE, talkers);
  return res.status(200).json({ id: Number(id), name, age, talk });
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];
  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));

  talkers.splice(talkerId, 1);
  
  await overwriteFile(PATH_FILE, talkers);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;