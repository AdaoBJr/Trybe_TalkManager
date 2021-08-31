const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const verifyEmail = (req, res, next) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  const { email } = req.body;

  if (!email || Object.values(email).length === 0) { 
      return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
}
  if (!emailRegex.test(email)) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
 }
  if (password.length < 6) {
    return res.status(400).json({ 
        message: 'O "password" deve ter pelo menos 6 caracteres' }); 
    }
 next();
};

router.post('/', verifyEmail, verifyPassword, (_req, res) => {
  res.status(200).json({ token });
});

module.exports = router;