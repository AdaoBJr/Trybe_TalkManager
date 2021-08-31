const router = require('express').Router();
const {
  editContentFile,
  deleteContentFile,
  readContentFile,
  writeContentFile } = require('./readWriteFile');
const validateData = require('./validateData');
const validateToken = require('./validateToken');

router.get('/', async (_req, res) => {
  const talkers = await readContentFile();
  res.status(200).json(talkers);
});

router.post('/', validateToken, validateData, async (req, res) => {
  const data = req.body;
  const newData = await writeContentFile(data);
  return res.status(201).json(newData);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const talkers = await readContentFile();
  console.log(talkers);
  if (!q || q === '') {
    return res.status(200).json(talkers);
  }
  const found = talkers.filter((talker) => talker.name.includes(q));
  if (found) {
    return res.status(200).json(found);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile();
  const talker = talkers.find((entry) => entry.id === parseInt(id, 10));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

router.put('/:id', validateToken, validateData, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const newData = await editContentFile(id, data);
  return res.status(200).json(newData);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const deletion = await deleteContentFile(id);
  if (deletion) {
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }
  return res.status(500).send();
});

module.exports = router;