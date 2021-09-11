const HTTP_UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token === '') {
    return res.status(HTTP_UNAUTHORIZED).json(
      { message: 'Token não encontrado' },
    );
  }
  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).json(
      { message: 'Token inválido' },
    ); 
  }
  
  next();
};

module.exports = validateToken;
