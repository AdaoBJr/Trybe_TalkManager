const generateToken = require('../functions/generateToken');
const emailRegex = require('../functions/emailRegex');

const OK_STATUS = 200;
const BAD_REQ = 400;

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  const emailVerif = emailRegex(email);

  if (!emailVerif) {
    return res.status(BAD_REQ).json({ message: 'O campo "email" é obrigatório' });
  }

  if (emailVerif !== true) {
    return res.status(BAD_REQ).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(BAD_REQ).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length <= 5) {
    return res.status(BAD_REQ).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const returnToken = (_req, res) => {
  const token = generateToken(16);

  return res.status(OK_STATUS).json({ token });

  // next();
};

module.exports = {
  returnToken,
  verifyEmail,
  verifyPassword,
};
