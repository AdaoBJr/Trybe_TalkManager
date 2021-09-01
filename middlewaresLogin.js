const crypto = require('crypto');

const tokenMiddleware = (_req, res, next) => {
  const token = crypto.randomBytes(8).toString('hex');
  next();
  return res.status(200).json({ token });
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(emailRegex.test(email))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = { tokenMiddleware, validateEmail, validatePassword };
