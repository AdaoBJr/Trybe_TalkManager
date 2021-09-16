const crypto = require('crypto');

const genarateToken = crypto.randomBytes(8).toString('hex');

const validates = (req, res) => {
  const { email, password } = req.body;

  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const validateEmail = regex.test(email);

  if (email.length === null) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length === 0) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const verificateLogin = (req, res) => {
  validates();
  res.status(200).json({ token: genarateToken });
};

module.exports = verificateLogin;
