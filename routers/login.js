const express = require('express');
const crypto = require('crypto');
const { emailValidator } = require('../middleware/loginValidator');
const { passValidator } = require('../middleware/passValidator');

const router = express.Router();

router.post('/', emailValidator, passValidator, (req, res) => {
const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

module.exports = router;