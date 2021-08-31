module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const validateEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  
  if (!validateEmail.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }  

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};
