const HTTP_400_STATUS = 400;
const PASSWORD_IS_REQUIRED = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' };

const isValidPassword = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    return response.status(HTTP_400_STATUS).json(PASSWORD_IS_REQUIRED);
  }
  if (password.length < 6) {
    return response.status(HTTP_400_STATUS).json(INVALID_PASSWORD);
  }
  next();
};

module.exports = isValidPassword;
