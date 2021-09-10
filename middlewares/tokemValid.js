const { StatusCodes } = require('http-status-codes');

const tokenValid = (req, res, next) => {
  const { authorization } = req.headers;
 
  if (!authorization) {
   return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
 
  if (authorization.length !== 16) {
   return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
 };

 module.exports = { tokenValid };