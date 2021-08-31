const router = require('express').Router();

const generateToken = require('../functions/generateToken');
const { validateEmail, validatePassword } = require('../middlewares/validateUser');

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;