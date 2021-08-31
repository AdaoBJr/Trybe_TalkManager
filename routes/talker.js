const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router(); 

router.get('/', async (_req, res) => {
  try { 
    const file = await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf-8');
    const parsedFile = await JSON.parse(file);
    res.status(200).json(parsedFile);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const file = await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf-8');
    const parsedFile = await JSON.parse(file);
    const foundUser = parsedFile.find((user) => Number(id) === Number(user.id));
    if (!foundUser) throw new Error('Pessoa palestrante não encontrada');
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;