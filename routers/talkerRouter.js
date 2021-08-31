const router = require('express').Router();
const { 
  validateName, 
  validateAge, 
  validateTalk, 
  validateDateAndRate, 
} = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');
const { readFileTalker, setFile, editFile, deleteFile } = require('../functions/talker');

router.get('/', async (_req, res) => {
  const file = await readFileTalker();
  if (!file) {
    return res.status(404).json({ message: 'talker not found' });
  }
  return res.status(200).json(file);
});

router.post('/', validateToken, validateName, 
  validateAge, validateTalk, validateDateAndRate, async (req, res) => {
    const dataTalker = req.body;

    const newUser = await setFile(dataTalker);
    
    return res.status(201).json(newUser);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readFileTalker();

 if (!q || q === '') {
    return res.status(200).json(talkers);
  }

  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (filteredTalkers) {
    return res.status(200).json(filteredTalkers);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const file = await readFileTalker();

  const talker = file.find((person) => person.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

router.put('/:id', validateToken, validateName, 
  validateAge, validateTalk, validateDateAndRate, async (req, res) => {
    const { id } = req.params;
    const dataTalker = req.body;

    const user = await editFile(id, dataTalker);
    
    return res.status(200).json(user);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteFile(id);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;