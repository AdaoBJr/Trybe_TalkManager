const express = require('express');

const router = express.Router();

const { 
  readTalkerJson,
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

module.exports = router;