const checkToken = (req, res, next) => {
  const TOKEN_LENGTH = 16;
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < TOKEN_LENGTH) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = checkToken;