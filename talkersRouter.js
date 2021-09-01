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

router.get('/search', isValidToken, async (req, res) => {
  const { name } = req.query;
  const palestrantes = await readTalkerJson();

  if (!name) return res.status(200).json(palestrantes);

  const filterPalestrantes = palestrantes.filter((palestrante) => palestrante.name.includes(name));
  res.status(200).json(filterPalestrantes);
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

router.delete('/:id', isValidToken, async (req, res) => {
  const { id } = req.params;
  const palestrantes = await readTalkerJson();

  const palestranteIndex = palestrantes.findIndex((palestrante) => 
    palestrante.id === parseInt(id, 10));

  if (palestranteIndex === -1) return res.status(404).json({ message: 'Palestrante not found' });
  palestrantes.splice(palestranteIndex, 1);
  updatePalestrantesList(palestrantes);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;