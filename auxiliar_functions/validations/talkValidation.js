const { BAD_REQUEST } = require('../../http_status/status');

const INVALID_TALK = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const talkValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) return res.status(BAD_REQUEST).json({ message: INVALID_TALK });

  if (!talk.watchedAt) return res.status(BAD_REQUEST).json({ message: INVALID_TALK });

  if (!talk.rate && talk.rate !== 0) return res.status(BAD_REQUEST).json({ message: INVALID_TALK });

  next();
};

module.exports = talkValidation;
