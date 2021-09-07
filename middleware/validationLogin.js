const HTTP_ERROR_LOGUIN = 400;

const passwordCheks = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_ERROR_LOGUIN).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_ERROR_LOGUIN)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const emailCheks = (req, res, next) => {
  const { email } = req.body;
  const regex = RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);
  if (!email) {
    return res.status(HTTP_ERROR_LOGUIN)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(HTTP_ERROR_LOGUIN)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = {
  passwordCheks,
  emailCheks,
};
