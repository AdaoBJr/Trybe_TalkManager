const router = require('express').Router();
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const { validateEmail, validatePassword } = require('../middlewares/validations');

router.post('/', 
  validateEmail, 
  validatePassword, 
  (_req, res) => res.status(200).json({ token: generateToken() }));

module.exports = router;