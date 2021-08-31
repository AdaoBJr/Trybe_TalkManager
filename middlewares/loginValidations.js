const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailCheck = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{3,}/i);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!emailCheck.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }     

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
};
