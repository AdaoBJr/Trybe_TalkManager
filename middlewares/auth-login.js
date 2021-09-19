const authLogin = (req, res, next) => {
  const { email, password } = req.body;

  const EMAIL_REGEX = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g); 
  const PASSWORD_MIN_CHARAC = 6;
  
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  if (password.length < PASSWORD_MIN_CHARAC) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = authLogin;