const CryptoJS = require('crypto-js');

const isValidToken = (req, res, next) => {
  const token = CryptoJS.SHA3('open', { outputLength: 64 }).toString();
  const { authorization } = req.headers;

  if (authorization === undefined || authorization === null || authorization === '') {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization !== token) {
    res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = isValidToken;