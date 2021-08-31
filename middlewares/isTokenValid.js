function isTokenValid(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (String(authorization).length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

module.exports = isTokenValid;
