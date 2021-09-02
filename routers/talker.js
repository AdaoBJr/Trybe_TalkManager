const fs = require('fs').promises;
const express = require('express');
const { ageValidator } = require('../middleware/ageValidator');
const { insertTalker } = require('../middleware/insertTalker');
const { nameValidator } = require('../middleware/nameValidator');
const { watchedValidator } = require('../middleware/watchedValidator');
const { ratedValidator } = require('../middleware/ratedValiator');
const { tokenValidator } = require('../middleware/tokenValidator');

const router = express.Router();

const fileReader = async () => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkerList);
};

// recebi a ajuda do Diegho e Cristian Bugs no requisito para encontrar o nome
router.get('/search', tokenValidator, async (req, res) => {
  const { name } = req.query;
  const talkers = await fileReader();
  if (!name) return res.status(200).json(talkers);
  const filterTalker = talkers.find((item) => item.name.includes(name));
 
  return res.status(200).json(filterTalker);
});

router.get('/', async (req, res) => {
  const talkers = await fileReader();
return res.status(200).send(talkers);
});

router.get('/:id', async (req, res) => {
const { id } = req.params;
const file = await fileReader();
const talker = file.find((item) => item.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker); 
});

router.post('/', tokenValidator, nameValidator, ageValidator,
 watchedValidator, ratedValidator, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fileReader();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await insertTalker(talkers);
  res.status(201).send(newTalker);
});

router.put('/:id', tokenValidator, nameValidator, ageValidator, 
watchedValidator, ratedValidator, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = await fileReader();
  const indexTalker = talkers.findIndex((item) => item.id === +id);

  talkers[indexTalker] = { id: Number(id), name, age, talk };
  await insertTalker(talkers);
  return res.status(200).send(talkers[indexTalker]);
});

router.delete('/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  const talkers = await fileReader();
  const indexTalker = talkers.findIndex((item) => item.id === +id);
  
  talkers.splice(indexTalker, 1);
  await insertTalker(talkers);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;