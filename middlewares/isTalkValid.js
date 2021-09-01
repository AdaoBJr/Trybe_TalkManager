function isTalkExistent(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    res
      .status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
}

function isTalkInfoExistent(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  if (!watchedAt || (!rate && rate !== 0)) {
    res
      .status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  
  next();
}

function isTalkValid(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  const regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
  if (!(regex.test(watchedAt))) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else if (!(Number.isInteger(rate)) || rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = { isTalkExistent, isTalkValid, isTalkInfoExistent };
