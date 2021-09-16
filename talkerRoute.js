const express = require('express');
const {
  getAllTalkers,
} = require('./fsModule');
const {
  getTalkerById,
} = require('./talkerMiddlewares');

const talkerRouter = express.Router();

// MIDDLEWARES

// ROUTES

talkerRouter.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (talkers) {
    return res.status(200).json(talkers);
  }
  return res.status(200).json([]);
});

talkerRouter.get('/:id', getTalkerById);

talkerRouter.post('/:token', (req, res) => {
  console.log(req, res);
});

module.exports = talkerRouter;