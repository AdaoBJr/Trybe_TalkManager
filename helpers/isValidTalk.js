const HTTP_400_STATUS = 400;
const INVALID_TALK = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const isValidTalk = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt, rate } = talk;
  if (!talk || !watchedAt || (!rate && rate !== 0)) {
    return response.status(HTTP_400_STATUS).json(INVALID_TALK);
  }
  next();
};

module.exports = isValidTalk;
