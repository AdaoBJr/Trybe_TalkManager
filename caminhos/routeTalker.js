const express = require('express');

const fs = require('fs').promises;
const { autoriza, data, idade, nome, talkExist } = require('../middleware/talkPost.js');

const router = express.Router();

const readFile = () => {
    const file = fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response));
    return file;
};

router.get('/', async (_req, res) => {
  const read = await readFile();
  if (!read) return res.status(200).json(Array.from([]));
  res.status(200).json(read);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readF = await readFile();
  const filtered = readF.find((resp) => Number(resp.id) === Number(id));
  if (!filtered) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(filtered);
});

// adicionar pessoa abaixo

router.post('/',
  autoriza,
  nome,
  idade,
  talkExist,
  data,
  async (req, res) => {
    const file = await readFile();
    const id = file.length + 1;
    const { name, age, talk } = req.body;
    const result = {
      id,
      name,
      age,
      talk,
    };
    const newTalkers = JSON.stringify([...file, result]);
    await fs.writeFile('talker.json', newTalkers);
    res.status(201).json(result);
});

module.exports = router;
