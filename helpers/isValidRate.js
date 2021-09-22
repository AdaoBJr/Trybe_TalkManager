const HTTP_400_STATUS = 400;
const INVALID_RATE = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

const isValidRate = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return response.status(HTTP_400_STATUS).json(INVALID_RATE);
  }
  next();
};

module.exports = isValidRate;
