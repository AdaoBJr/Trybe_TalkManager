const { BAD_REQUEST } = require('../../http_status/status');
const dateRegexValidation = require('./dateRegexValidation');

const INVALID_DATE = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

const dateValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const date = dateRegexValidation(watchedAt);

  if (!date) return res.status(BAD_REQUEST).json({ message: INVALID_DATE });

  next();
};

module.exports = dateValidation;
