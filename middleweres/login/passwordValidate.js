const { BAD_REQUEST } = require('../../http_status/status');

const EMPTY_MSG = 'O campo "password" é obrigatório';
const INVALID_MSG = 'O "password" deve ter pelo menos 6 caracteres';

const passwordValidate = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(BAD_REQUEST).json({ message: EMPTY_MSG });
  if (password.length < 6) return res.status(BAD_REQUEST).json({ message: INVALID_MSG });

  next();
};

module.exports = passwordValidate;
