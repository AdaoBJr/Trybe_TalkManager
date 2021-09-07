const sendErrorMessage = require('./sendErrorMessage');

module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (!token) sendErrorMessage(401, 'Token não encontrado', res);
  else if (token.length !== 16) sendErrorMessage(401, 'Token inválido', res);
  else next();
};
