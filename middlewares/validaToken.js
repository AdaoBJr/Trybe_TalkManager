function validaToken(req, res, next) {
  const currToken = req.headers.authorization;
  if (!currToken) {
   return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (currToken.length !== 16) {
   return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

module.exports = validaToken;
