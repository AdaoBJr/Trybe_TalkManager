const router = require('express').Router();
const crypto = require('crypto');

const {
    isValidEmail,
    isValidPassword,
  } = require('./middleware');

  router.post(
    '',
    isValidEmail,
    isValidPassword,
    (_req, res) => { 
    const tok = crypto.randomBytes(8).toString('hex');
    console.log(tok);
    res.status(200).json({ token: tok });
    },
  );
  module.exports = router;