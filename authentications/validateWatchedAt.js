const BAD_REQUEST = 400;

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const validFormatDate = regexDate.test(watchedAt);

  if (!watchedAt) {
    return res
    .status(BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!validFormatDate) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validateWatchedAt;
