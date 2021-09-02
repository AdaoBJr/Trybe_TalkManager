const express = require('express');
const { randomBytes } = require('crypto');
const { checkEmail } = require('../middlewares/validationMiddlewares');

const router = express.Router();

const validateParams = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  // teste branch
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  next();
};

router.post('/', validateParams, (req, res) => {
  const { email, password } = req.body;
  const validEmail = checkEmail(email);
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token: randomBytes(8).toString('hex') });
});

module.exports = router;
