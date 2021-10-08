const { verifyToken } = require('../services/login');

const HTTP_UNAUTHORIZED_STATUS = 401;

async function authenticationMiddleware(request, response, next) {
  const token = request.headers.authorization;
  const validateToken = verifyToken(token);

  if (validateToken !== true) { 
    return response.status(HTTP_UNAUTHORIZED_STATUS).json({ message: validateToken }); 
  }

  next();
}

module.exports = authenticationMiddleware;