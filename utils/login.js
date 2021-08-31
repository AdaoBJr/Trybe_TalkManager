const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

async function login(req, res) {
  const { email, password } = req.body;
  const regex = /^[^\s@]+@[^\s@]+$/;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.match(regex)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: generateToken() });
}

module.exports = login;
