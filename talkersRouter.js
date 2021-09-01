const express = require('express');

const router = express.Router();

const { 
  readTalkerJson,
  isValidToken,
  validName,
  validAge,
  validTalk,
  validaData,
  validRate,
  updatePalestrantesList,
} = require('./middlewares');

router.get('/', async (_req, res) => {
  const palestrantes = await readTalkerJson();

  res.status(200).json(palestrantes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const palestrantes = await readTalkerJson();

  const getPalestranteByID = palestrantes.filter((palestrante) => 
     palestrante.id === parseInt(id, 10));

  if (!getPalestranteByID.length) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(...getPalestranteByID);
});

router.post('/', 
  isValidToken, validName, validAge, validTalk, validaData, validRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const palestrantes = await readTalkerJson();
  const id = palestrantes.length + 1;
  const newPalestrante = { id, name, age, talk };
  palestrantes.push(newPalestrante);
  updatePalestrantesList(palestrantes);

  res.status(201).json(newPalestrante);
});

router.put('/:id', 
  isValidToken, validName, validAge, validTalk, validaData, validRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const palestrantes = await readTalkerJson();

  const palestranteIndex = palestrantes.findIndex((palestrante) => 
    palestrante.id === parseInt(id, 10));

  if (palestranteIndex === -1) return res.status(404).json({ message: 'Palestrante not found' });
  palestrantes[palestranteIndex] = { ...palestrantes[palestranteIndex], name, age, talk };
  updatePalestrantesList(palestrantes);
  res.status(200).json(palestrantes[palestranteIndex]);
});

module.exports = router;