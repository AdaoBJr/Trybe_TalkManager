const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const { validateEmail, validatePassword } = require('./middlewares');

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const createToken = crypto.randomBytes(8).toString('hex');
  const token = { token: createToken };

  res.status(200).json(token);
});

module.exports = router;
