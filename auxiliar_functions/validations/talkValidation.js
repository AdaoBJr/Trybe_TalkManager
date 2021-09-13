const { BAD_REQUEST } = require('../../http_status/status');

const INVALID_TALK = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const talkValidation = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;

  if (!watchedAt) return res.status(BAD_REQUEST).json({ message: INVALID_TALK });

  if (!rate) return res.status(BAD_REQUEST).json({ message: INVALID_TALK });

  next();
};

module.exports = talkValidation;
