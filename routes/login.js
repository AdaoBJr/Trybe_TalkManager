const { Router } = require('express');
const generateToken = require('../helpers/generateToken');
const { StatusCodes: { OK } } = require('http-status-codes');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');
const router = Router();

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken(16);
  return res.status(OK).json({ token });
});

module.exports = router;
