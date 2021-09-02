const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const validEmail = /.+@[A-z]+[.]com/.test(email);
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

module.exports = validateLogin;
