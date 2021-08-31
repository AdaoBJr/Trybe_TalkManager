const router = require('express').Router();
const crypto = require('crypto');
const validateLogin = require('./validateLogin');

router.post('/', validateLogin, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;