function validaTalk(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  const arrDate = watchedAt.split('/');
  if (arrDate[0].length > 2) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number.isInteger(rate) === false || (rate < 1 || rate > 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = validaTalk;
