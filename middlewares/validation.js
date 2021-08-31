const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (
    !email
    || !email.includes('@' || '.')
  ) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = /^[0-9]*$/;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length <= 6 || !password.match(passwordRegex)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
};