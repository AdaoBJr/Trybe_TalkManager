const UNAUTHORIZED = 401;
const TOKEN_LENGTH = 16;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  if (authorization.length < TOKEN_LENGTH) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateToken;
