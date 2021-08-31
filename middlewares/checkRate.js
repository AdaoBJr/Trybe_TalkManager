const checkRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (Number.isInteger(rate) && rate >= 1 && rate <= 5) {
    return next();
  }
  return res.status(400).json({
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  });
};

module.exports = checkRate;
