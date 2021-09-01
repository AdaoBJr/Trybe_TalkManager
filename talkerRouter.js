const express = require('express');

const router = express.Router();

const { getTalkers } = require('./middlewares');

router.get('/', async (_req, res) => {
  const talkerList = await getTalkers();
  if (!talkerList) return res.status(200).JSON.parse([]);

  res.status(200).send(talkerList);
});

module.exports = router;
