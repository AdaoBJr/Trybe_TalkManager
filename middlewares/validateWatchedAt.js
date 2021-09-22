const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { talk } = req.body;
  const watchedAtPattern = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!watchedAtPattern.test(talk.watchedAt)) {
    const date = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    return res.status(BAD_REQUEST).json({ message: date });
  }
  
  next();
};
