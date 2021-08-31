const express = require('express');
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('./utils');

const HTTP_OK_STATUS = 200;
const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;
