const HTTP_400_STATUS = 400;
const NAME_IS_REQUIRED = { message: 'O campo "name" é obrigatório' };
const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };

const isValidName = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(HTTP_400_STATUS).json(NAME_IS_REQUIRED);
  }
  if (name.length < 3) {
    return response.status(HTTP_400_STATUS).json(INVALID_NAME);
  }
  next();
};

module.exports = isValidName;
