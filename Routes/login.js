const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const token = crypto.randomBytes(8).toString('hex');

router.post('/', (req, res) => {
  const { email, passwd } = req.body;
  const myToken = { token };
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(/\S+@\S+\.com/)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!passwd) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (passwd.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json(myToken);
});

module.exports = router;
