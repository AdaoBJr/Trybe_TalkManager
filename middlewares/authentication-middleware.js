const { verifyToken } = require('../services/login');
const { handleFileReading } = require('../services/readAndWrite');

const tokens = './tokens.json';

const HTTP_UNAUTHORIZED_STATUS = 401;

async function authenticationMiddleware(request, response, next) {
  const token = request.headers.authorization;

  const tokensDatabase = await handleFileReading(tokens);
  const validateToken = verifyToken(tokensDatabase, token);

  if (validateToken !== true) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).json({ message: validateToken });
  }

  next();
}

module.exports = authenticationMiddleware;