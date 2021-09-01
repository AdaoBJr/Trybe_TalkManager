const criateToken = () => {
  const token = '7mqaVRXJSp886CGr';
  return token;
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400)
    .json({ message: 'O campo "password" é obrigatório' });
  }

  next();
};

const validateParams = (req, res, _next) => {
  const token = criateToken();
  const { email, password } = req.body;
  const validateEmail = /\S+@\S+\.\S+/;
    
  if (!validateEmail.test(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  return res.status(200).json({ token });
};

module.exports = {
  login,
  validateParams,
};
