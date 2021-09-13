const { BAD_REQUEST } = require('../../http_status/status');

const EMPTY_NAME = 'O campo "name" é obrigatório';
const INVALID_NAME = 'O "name" deve ter pelo menos 3 caracteres';

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(BAD_REQUEST).json({ message: EMPTY_NAME });

  if (name.length < 3) return res.status(BAD_REQUEST).json({ message: INVALID_NAME });

  next();
};

module.exports = nameValidation;
