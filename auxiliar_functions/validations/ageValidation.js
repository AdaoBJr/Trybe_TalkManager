const { BAD_REQUEST } = require('../../http_status/status');

const EMPTY_AGE = 'O campo "age" é obrigatório';
const INVALID_AGE = 'A pessoa palestrante deve ser maior de idade';

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(BAD_REQUEST).json({ message: EMPTY_AGE });

  if (age < 18) return res.status(BAD_REQUEST).json({ message: INVALID_AGE });

  next();
};

module.exports = ageValidation;
