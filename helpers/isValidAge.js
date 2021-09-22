const HTTP_400_STATUS = 400;
const AGE_IS_REQUIRED = { message: 'O campo "age" é obrigatório' };
const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };

const isValidAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(HTTP_400_STATUS).json(AGE_IS_REQUIRED);
  }
  if (age < 18) {
    return response.status(HTTP_400_STATUS).json(INVALID_AGE);
  }
  next();
};

module.exports = isValidAge;
