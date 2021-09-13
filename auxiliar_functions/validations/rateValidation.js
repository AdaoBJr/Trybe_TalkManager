const { BAD_REQUEST } = require('../../http_status/status');

const INVALID_RATE = 'O campo "rate" deve ser um inteiro de 1 à 5';

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate < 1 || rate > 5) return res.status(BAD_REQUEST).json({ message: INVALID_RATE });

  next();
};

module.exports = rateValidation;
