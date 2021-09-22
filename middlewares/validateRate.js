const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { talk } = req.body;
  const ratePattern = /^[1-5]{1}$/;
  
  if (!ratePattern.test(talk.rate)) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  next();
};
