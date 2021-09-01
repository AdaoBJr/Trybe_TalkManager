const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
  criarNovoPalestrante,
  verifyname,
  verifyToken,
  verifyAge,
  verifyFieldsTalk,
  verifyDate,
  verifyRate,
} = require('../requirements/functionsAndValidations');

router.post('/',
verifyname,
verifyToken,
verifyAge,
verifyFieldsTalk,
verifyDate,
verifyRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const palestrantes = await getAllTalkers();
  const id = palestrantes.length + 1;
  const novoPalestrante = { id, name, age, talk };
  palestrantes.push(novoPalestrante);
  criarNovoPalestrante(palestrantes);
  return res.status(201).json(novoPalestrante);
});

module.exports = router;
