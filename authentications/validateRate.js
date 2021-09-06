const BAD_REQUEST = 400;

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  
  if (typeof rate !== 'number') {
    return res.status(BAD_REQUEST)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  if (rate < 1 || rate > 5) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validateRate;
