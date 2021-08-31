const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const { 
   validateToken, 
   validateName,
   validateAge, 
   validateWatchedAt,
   validateRate,
   validateTalk,
  } = require('../middleware/postValidationMiddleware');

const router = express.Router(); 

const talkerDir = path.join(__dirname, '..', 'talker.json');

router.get('/', async (_req, res) => {
  try { 
    const file = await fs.readFile(talkerDir, 'utf-8');
    const parsedFile = await JSON.parse(file);
    res.status(200).json(parsedFile);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const file = await fs.readFile(talkerDir, 'utf-8');
    const parsedFile = await JSON.parse(file);
    const foundUser = parsedFile.find((user) => Number(id) === Number(user.id));
    if (!foundUser) throw new Error('Pessoa palestrante não encontrada');
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.use(validateToken);
router.use(validateName);
router.use(validateAge);
router.use(validateTalk);
router.use(validateWatchedAt);
router.use(validateRate);

router.post('/',

 async (req, res) => {
  const document = req.body;

  try {
    const file = await fs.readFile(talkerDir, 'utf-8');
    const parsedFile = await JSON.parse(file);
    const newId = parsedFile[parsedFile.length - 1].id + 1;
    document.id = newId;
    parsedFile.push(document);
    const stringfiedFile = JSON.stringify(parsedFile);
    await fs.writeFile(talkerDir, stringfiedFile, 'utf-8');
    res.status(201).json(document);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;