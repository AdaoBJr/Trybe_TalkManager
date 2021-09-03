const PASSWORD_LENGTH = 6;

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < PASSWORD_LENGTH) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = checkPassword;
