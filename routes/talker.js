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

module.exports = router;
