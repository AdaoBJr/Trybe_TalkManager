const { generateToken } = require('../fs-utils.js');

const HTTP_OK_STATUS = 200;
const FAIL_STATUS = 400;

const login = (req, res) => {
  const { email, password } = req.body;
  const emailValidated = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!email) {
    res.status(FAIL_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidated) {
    res.status(FAIL_STATUS).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(FAIL_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res.status(FAIL_STATUS).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(HTTP_OK_STATUS).json({ token: generateToken() });
};

module.exports = login;
