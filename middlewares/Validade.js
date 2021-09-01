const validate = (token, res) => {
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const tokenIsValid = 16;
  if (token.length < tokenIsValid) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return null;
};

module.exports = {
  validate,
};
