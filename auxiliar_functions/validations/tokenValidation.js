const { UNAUTHORIZED } = require('../../http_status/status');

const EMPTY_TOKEN = 'Token não encontrado';
const INVALID_TOKEN = 'Token inválido';

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: EMPTY_TOKEN });

  if (token.length !== 16) return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });

  next();
};

module.exports = tokenValidation;
