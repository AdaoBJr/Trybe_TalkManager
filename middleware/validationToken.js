const HTTP_ERROR_TOKEN = 401;
const TOKEN_LENGTH = 16;

const tokenCheks = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
  return res.status(HTTP_ERROR_TOKEN).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== TOKEN_LENGTH) {
    return res.status(HTTP_ERROR_TOKEN).send({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  tokenCheks,
};
