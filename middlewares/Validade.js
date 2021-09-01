const validate = (token, res) => {
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return null;
};

module.exports = {
  validate,
};
