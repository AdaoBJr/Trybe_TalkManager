const express = require('express');
const db = require('../db');

const router = express.Router();

router.use(async (req, res, next) => {
  const data = await db.readData().catch(next);
  if (!data) return next(data);
  req.context = {
    data,
  };
  return next();
});

router.get('/', (req, res) => res.status(200).json(req.context.data));

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const result = req.context.data.find((value) => value.id === Number(id))
    || new Error('Pessoa palestrante não encontrada');
  if (result instanceof Error) {
    result.errCode = 404;
    return next(result);
  }
  return res.status(200).json(result);
});

module.exports = router;
