const BAD_REQUEST = 400;
const NUMBER_MIN_CHARACTERS = 6;

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < NUMBER_MIN_CHARACTERS) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};

module.exports = validatePassword;
