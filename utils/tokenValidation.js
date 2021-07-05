exports.tokenValidation = (req, _res, next) => {
  if (!req.headers.authorization) {
    const error = new Error('Token não encontrado');
    error.errCode = 401;
    return next(error);
  }
  if (req.headers.authorization.length !== 16) {
    const error = new Error('Token inválido');
    error.errCode = 401;
    return next(error);
  }
  return next();
};