const verifyRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!(rate > 0 && rate < 6)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = verifyRate;