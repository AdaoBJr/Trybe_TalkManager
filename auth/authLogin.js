module.exports = (req, res, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email, password } = req.body;
  switch (true) {
    case !email:
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    case !regex.test(email):
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    case !password:
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    case password.length < 6:
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    default:
      break;
  }
  next();
};
