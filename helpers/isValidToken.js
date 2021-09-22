const HTTP_401_STATUS = 401;
const NOT_FOUND_TOKEN = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };

const isValidToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(HTTP_401_STATUS).json(NOT_FOUND_TOKEN);
  }
  if (authorization.length !== 16) {
    return response.status(HTTP_401_STATUS).json(INVALID_TOKEN);
  }
  next();
};

module.exports = isValidToken;
