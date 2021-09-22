const HTTP_400_STATUS = 400;
const REGEX_DATE = /\d{2}\/\d{2}\/\d{4}/g;
const INVALID_DATE = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

const isValidWatchedAt = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  if (!REGEX_DATE.test(watchedAt)) {
    return response.status(HTTP_400_STATUS).json(INVALID_DATE);
  }
  next();
};

module.exports = isValidWatchedAt;
