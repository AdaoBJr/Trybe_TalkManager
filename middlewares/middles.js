const emailAuth = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) {
   return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordAuth = (req, res, next) => {
  const { password } = req.body;
  const passowrdRegex = /[\w\D]{6}/.test(password);
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!passowrdRegex) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  emailAuth,
  passwordAuth,
};