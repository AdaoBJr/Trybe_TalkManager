const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const isValid = /^[\w]{16}$/i;
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (!isValid.test(authorization)) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};
