const express = require('express');
const db = require('../db');
const { talker, token, ctx } = require('../utils');

const router = express.Router();

router.use(ctx.createReqCtx);

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

router.use(token.tokenValidation);

router.post('/', async (req, res, next) => {
  const validation = talker.talkerInputValidation(req.body);
  const { data } = req.context;
  if (validation instanceof Error) {
    validation.errCode = 400;
    return next(validation);
  }

  const newTalker = {
    id: data[data.length - 1].id + 1,
    ...req.body,
  };

  req.context.data.push(newTalker);
  await db.writeData(req.context.data).catch(next);

  return res.status(201).json(newTalker);
});

router.put('/:id', async (req, res, next) => {
  const validation = talker.talkerInputValidation(req.body);
  const { data } = req.context;
  const { id } = req.params;
  if (validation instanceof Error) {
    validation.errCode = 400;
    return next(validation);
  }
  const newTalker = {
    id: parseInt(id, 10),
    ...req.body,
  };
  const newData = data.map((talkerData) => {
    if (talkerData.id === parseInt(id, 10)) return newTalker;
    return talkerData;
  });
  await db.writeData(newData).catch(next);

  return res.status(200).json(newTalker);
});

module.exports = router;
