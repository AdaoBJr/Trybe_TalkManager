const express = require('express');
const CryptoJS = require('crypto-js');
const isValidEmail = require('./middlewares/isValidEmail');
const isValidPassword = require('./middlewares/isValidPassword');

const router = express.Router();

router.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  const token = CryptoJS.SHA3('open', { outputLength: 64 }).toString();

  res.status(200).json({ token });
});

module.exports = router;
